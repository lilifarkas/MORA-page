using System.Security.Claims;
using backend.Models.Entities;
using backend.Models.Requests;
using backend.Models.Responses;
using backend.Services;
using backend.Services.Authenticator;
using backend.Services.PasswordHasher;
using backend.Services.RefreshTokenService;
using backend.Services.TokenValidator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

public class AuthController : ControllerBase
{
    private readonly IUserService _service;
    private readonly IPasswordHasher _passwordHasher;
    private readonly Authenticator _authenticator;
    private readonly RefreshTokenValidator _refreshTokenValidator;
    private readonly IRefreshTokenService _refreshTokenService;

    public AuthController(IUserService service, IPasswordHasher passwordHasher, Authenticator authenticator, RefreshTokenValidator refreshTokenValidator, IRefreshTokenService refreshTokenService )
    {
        _service = service;
        _passwordHasher = passwordHasher;
        _authenticator = authenticator;
        _refreshTokenValidator = refreshTokenValidator;
        _refreshTokenService = refreshTokenService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest registerRequest)
    {
        if (!ModelState.IsValid)
        {
            BadRequestModelState();
        }
        
        if (registerRequest.Password != registerRequest.ConfirmPassword)
        {
            return BadRequest(new ErrorResponse("Password does not match confirm password"));
        }
        
        var existingUserByEmail = await _service.GetByEmail(registerRequest.Email);
        if (existingUserByEmail != null)
        {
            return Conflict(new ErrorResponse("Email already exist"));
        }
        
        var existingUserByUsername = await _service.GetByName(registerRequest.Name);
        if (existingUserByUsername != null)
        {
            return Conflict(new ErrorResponse("Name already exist"));
        }
        
        var passwordHash = _passwordHasher.HashPassword(registerRequest.Password);
        
        var registrationUser = new User()
        {
            Name = registerRequest.Name,
            Role = registerRequest.Role,
            Email = registerRequest.Email,
            Phone = registerRequest.PhoneNumber,
            Password = passwordHash
        };

        await _service.Add(registrationUser);
        return Ok();
    }
    //With local storage
    // [HttpPost("login")]
    // public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
    // {
    //     if (!ModelState.IsValid)
    //     {
    //         return BadRequestModelState();
    //     }
    //
    //     var user = await _service.GetByName(loginRequest.Username);
    //     if (user == null)
    //     {
    //         return Unauthorized();
    //     }
    //
    //     var isCorrectPassword = _passwordHasher.VerifyPassword(loginRequest.Password, user.Password);
    //     if (!isCorrectPassword)
    //     {
    //         return Unauthorized();
    //     }
    //
    //     var response = await _authenticator.Authenticate(user);
    //
    //     return Ok(response);
    // }
    
    //HTTP Only Cookie
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
    {
        if (!ModelState.IsValid)
        {
            return BadRequestModelState();
        }

        var user = await _service.GetByName(loginRequest.Username);
        if (user == null)
        {
            return Unauthorized();
        }

        var isCorrectPassword = _passwordHasher.VerifyPassword(loginRequest.Password, user.Password);
        if (!isCorrectPassword)
        {
            return Unauthorized();
        }
        
        var response = await _authenticator.Authenticate(user);
        
        HttpContext.Response.Cookies.Append("X-Refresh-Token", response.RefreshToken,
            new CookieOptions
            {
                Expires = DateTime.Now.AddMinutes(15),
                HttpOnly = true,
                Secure = true,
                IsEssential = true,
                SameSite = SameSiteMode.None,
                // Path = "/refresh"
            });

        HttpContext.Response.Cookies.Append("X-Access-Token", response.AccessToken,
            new CookieOptions
            {
                Expires = DateTime.Now.AddMinutes(15),
                HttpOnly = true,
                Secure = true,
                IsEssential = true,
                SameSite = SameSiteMode.None,
                // Path = "/refresh"
            });
        
        Response.Cookies.Append("X-UserId", user.ID.ToString(),
            new CookieOptions
            {
                Expires = DateTime.Now.AddMinutes(15),
                HttpOnly = true,
                Secure = true,
                IsEssential = true,
                SameSite = SameSiteMode.None,
                // Path = "/refresh"
            });
        
        return Ok();
    }
    
    [HttpGet("get-user")]
    [Authorize]
    public IActionResult GetUser()
    {
        // Retrieve the "id" claim value from the ClaimsIdentity
        var idClaim = User.FindFirst("ID");
        if (idClaim == null)
        {
            return BadRequest("User ID not found in token");
        }
        var userId = idClaim.Value;
        Int64.TryParse(userId, out var id);
        
        // Retrieve the user details from the database based on the user ID
        var user = _service.GetById(id);
        if (user == null)
        {
            return NotFound();
        }
    
        // Return the user details as a JSON response
        
        return Ok(user.Result);
    }
    
    // [HttpPost("refresh")]
    // public async Task<IActionResult> Refresh([FromBody] RefreshRequest refreshRequest)
    // {
    //     if (!ModelState.IsValid)
    //     {
    //         Console.WriteLine("here");
    //         return BadRequestModelState();
    //     }
    //         
    //     //validate refresh token to make sure it exist in the database
    //     var isValidRefreshToken = _refreshTokenValidator.Validate(refreshRequest.RefreshToken);
    //     if (!isValidRefreshToken)
    //     {
    //         return BadRequest(new ErrorResponse("Invalid/Expired refresh token."));
    //     }
    //
    //     var refreshTokenDTO = await _refreshTokenService.GetByToken(refreshRequest.RefreshToken);
    //     if (refreshTokenDTO == null)
    //     {
    //         return NotFound(new ErrorResponse("Invalid refresh token"));
    //     }
    //     
    //     //delete refresh token to cant be used multiple times
    //     await _refreshTokenService.Delete(refreshTokenDTO.Id);
    //     
    //     var user = await _service.GetById(refreshTokenDTO.UserId);
    //     if (user == null)
    //     {
    //         return NotFound(new ErrorResponse("User not found"));
    //     }
    //
    //     //we need to invalidate refresh tokens without changing the secret key
    //     //get the user for the given token to figure out who sent the refresh request
    //     var response = await _authenticator.Authenticate(user);
    //     
    //     Response.Cookies.Append("refjwt", response.RefreshToken, new CookieOptions
    //     {
    //         HttpOnly = true
    //     });
    //     
    //     //send refresh token back to the user
    //     return Ok(response);
    // }
    
    [HttpGet("refresh")] 
    public async Task<IActionResult> Refresh()
    {
        var refreshRequest = Request.Cookies["X-Refresh-Token"];

        Int64.TryParse(Request.Cookies["X-UserId"], out var userId);
        
        if (!User.Identity.IsAuthenticated)
        {
            // User is not authenticated, return an error response
            return Unauthorized();
        }

        var unparsedUserId = HttpContext.User.FindFirstValue("id");
        Console.WriteLine(unparsedUserId);


        if (!ModelState.IsValid)
        {
            return BadRequestModelState();
        }
            
        //validate refresh token to make sure it exist in the database
        var isValidRefreshToken = _refreshTokenValidator.Validate(refreshRequest);
        if (!isValidRefreshToken)
        {
            return BadRequest(new ErrorResponse("Invalid/Expired refresh token."));
        }


        var user = await _service.GetById(userId);
        if (user == null)
        {
            return NotFound(new ErrorResponse("User not found"));
        }

        //az adott tokenhez tartozó felhasználó lekérdezése
        var response = await _authenticator.Authenticate(user);
        
        HttpContext.Response.Cookies.Append("X-Access-Token", response.AccessToken,
            new CookieOptions
            {
                Expires = DateTime.Now.AddMinutes(15),
                HttpOnly = true,
                Secure = true,
                IsEssential = true,
                SameSite = SameSiteMode.None,
                // Path = "/refresh"
            });
        
        HttpContext.Response.Cookies.Append("X-Refresh-Token", response.RefreshToken,
            new CookieOptions
            {
                Expires = DateTime.Now.AddMinutes(15),
                HttpOnly = true,
                Secure = true,
                IsEssential = true,
                SameSite = SameSiteMode.None,
                // Path = "/refresh"
            });
        
        Response.Cookies.Append("X-UserId", user.ID.ToString(),
            new CookieOptions
            {
                Expires = DateTime.Now.AddMinutes(15),
                HttpOnly = true,
                Secure = true,
                IsEssential = true,
                SameSite = SameSiteMode.None,
                // Path = "/refresh"
            });
        //send refresh token back to the user
        return Ok(response);
    }
    
    [Authorize]
    [HttpDelete("logout")]
    public async Task<IActionResult> Logout()
    {
        Response.Cookies.Delete("X-Access-Token", new CookieOptions 
        {
            HttpOnly = true,
            Secure = true,
            IsEssential = true,
            SameSite = SameSiteMode.None,
        });
        
        Response.Cookies.Delete("X-Refresh-Token", new CookieOptions 
        {
            HttpOnly = true,
            Secure = true,
            IsEssential = true,
            SameSite = SameSiteMode.None,
        });
        
        Response.Cookies.Delete("X-UserId", new CookieOptions 
        {
            HttpOnly = true,
            Secure = true,
            IsEssential = true,
            SameSite = SameSiteMode.None,
        });
        
        return Ok(new
        {
            message = "success"
        });
    }
    
    private IActionResult BadRequestModelState()
    {
        var errorMessages = ModelState.Values.SelectMany(v =>
            v.Errors.Select(e => e.ErrorMessage));
        
        return BadRequest(new ErrorResponse(errorMessages));
    }
}   