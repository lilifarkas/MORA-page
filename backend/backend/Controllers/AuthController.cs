using backend.Models.Entities;
using backend.Models.Requests;
using backend.Models.Responses;
using backend.Services;
using backend.Services.PasswordHasher;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

public class AuthController : ControllerBase
{
    private readonly IUserService _service;
    private readonly IPasswordHasher _passwordHasher;

    public AuthController(IUserService service, IPasswordHasher passwordHasher)
    {
        _service = service;
        _passwordHasher = passwordHasher;
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
            Email = registerRequest.Email,
            Phone = registerRequest.PhoneNumber,
            Password = passwordHash
        };

        var response = await _service.Add(registrationUser);
        return Ok(response);
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
    {
        throw new NotImplementedException();
    }
    
    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh([FromBody] RefreshRequest refreshRequest)
    {
        throw new NotImplementedException();
    }
    
    [Authorize]
    [HttpDelete("logout")]
    public async Task<IActionResult> Logout()
    {
        throw new NotImplementedException();
    }
    
    private IActionResult BadRequestModelState()
    {
        var errorMessages = ModelState.Values.SelectMany(v =>
            v.Errors.Select(e => e.ErrorMessage));
        
        return BadRequest(new ErrorResponse(errorMessages));
    }
}   