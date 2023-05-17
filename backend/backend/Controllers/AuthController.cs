using backend.Models.Entities;
using backend.Models.Requests;
using backend.Services;
using backend.Services.PasswordHasher;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

public class AuthController : ControllerBase
{
    private readonly UserService _service;
    private readonly IPasswordHasher _passwordHasher;

    public AuthController(UserService service, IPasswordHasher passwordHasher)
    {
        _service = service;
        _passwordHasher = passwordHasher;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest registerRequest)
    {
        throw new NotImplementedException();
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
    
    //if the user doesnt provide username and password
    private IActionResult BadRequestModelState()
    {
        throw new NotImplementedException();
    }
}   