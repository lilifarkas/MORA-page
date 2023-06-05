using backend.Models.Entities;
using backend.Models.Requests;
using backend.Services;
using backend.Services.PasswordHasher;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController, Route("/user")]
public class UserController: ControllerBase
{
    private readonly IUserService _service;
    private readonly IPasswordHasher _passwordHasher;
   
    public UserController(IUserService service, IPasswordHasher passwordHasher)
    {
        _service = service;
        _passwordHasher = passwordHasher;
    }
    
    [HttpGet("/users/{id}")]
    public async Task<User> GetUserById(long id)
    {
        return await _service.GetById(id);
    }
    
    [HttpGet]
    public async Task<IEnumerable<User>> GetAllUser()
    {
        return await _service.GetAll();
    }
    
    [HttpPut("/users/update/{id}")]
    public async Task UpdateUser(long id, [FromBody] User user)
    {
        await _service.Update(user, id);
    }
    
    [HttpPut("/change-pass/{id}")]
    public async Task<IActionResult> ChangePassword(long id, [FromBody] ChangePasswordRequest changePasswordRequest)
    {
        var user = await _service.GetById(id);
        if (user == null)
        {
            return Unauthorized();
        }

        var isCorrectPassword = _passwordHasher.VerifyPassword(changePasswordRequest.Password, user.Password);
        if (!isCorrectPassword)
        {
            return Unauthorized();
        }

        await _service.ChangePassword(id, changePasswordRequest);
        return Ok();
    }
    
    [HttpDelete("/users/delete/{id}")]
    public async Task DeleteUser(long id)
    {
        await _service.Delete(id);
    }
}