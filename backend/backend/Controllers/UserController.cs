using backend.Models.Entities;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController, Route("/user")]
public class UserController: ControllerBase
{
    private readonly IUserService _service;
   
    public UserController(IUserService service)
    {
        _service = service;
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
    
    [HttpDelete("/users/delete/{id}")]
    public async Task DeleteUser(long id)
    {
        await _service.Delete(id);
    }
}