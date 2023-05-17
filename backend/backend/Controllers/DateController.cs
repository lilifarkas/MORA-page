using backend.Models.Entities;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController, Route("/date")]
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
        // return await _service.;
        throw new NotImplementedException();
    }
}