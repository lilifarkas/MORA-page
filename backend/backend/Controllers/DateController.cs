using backend.Models.Entities;
using backend.Models.Requests;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController, Route("/dates")]
public class DateController: ControllerBase
{
    private readonly DateService _service;
   
    public DateController(DateService service)
    {
        _service = service;
    }
    
    [HttpGet("{userID}/allDates")]
    public async Task<IEnumerable<BookedDate>> GetUserDates(long userID)
    {
        return await _service.GetUserDates(userID);

    }
    
    [HttpGet]
    public async Task<IEnumerable<BookedDate>> GetAllDates()
    {
        return await _service.GetAll();
    }

    [HttpPost("registerDate")]
    public async Task<IActionResult> Register([FromBody] RegisterDateRequest registerDateRequest)
    {
        var registrationDate = new BookedDate()
        {
            User = registerDateRequest.User,
            Date = registerDateRequest.Date,
            BookedTime = registerDateRequest.BookedTime
        };

        var response = await _service.Add(registrationDate);
        return Ok(response);
    }
    
    [HttpDelete("/dates/delete/{id}")]
    public async Task DeleteBookedDate(long id)
    {
        await _service.Delete(id);
    }
}