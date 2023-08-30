using backend.Models.Entities;
using backend.Models.Requests;
using backend.Services.FeedbackService;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController, Route("/feedbacks")]

public class FeedbackController: ControllerBase
{
    private readonly IFeedbackService _service;
   
    public FeedbackController(IFeedbackService service)
    {
        _service = service;
    }
    
    [HttpGet("{userID}/feedback")]
    public async Task<IEnumerable<Feedback>> GetUserFeedback(long userID)
    {
        return await _service.GetUserFeedback(userID);

    }
    
    [HttpGet]
    public async Task<IEnumerable<Feedback>> GetAllFeedbacks()
    {
        return await _service.GetAll();
    }

    [HttpPost("registerFeedback")]
    public async Task<IActionResult> Register([FromBody] RegisterFeedbackRequest registerFeedbackRequest)
    {
        var registrationFeedback = new Feedback()
        {
            UserId = registerFeedbackRequest.UserId,
            Date = DateTime.Now,
            Comment = registerFeedbackRequest.Comment,
            Rating = registerFeedbackRequest.Rating,
            IsApproved = false
        };
        var response = await _service.Add(registrationFeedback);
        return Ok(response);
    }
    
    [HttpDelete("/feedbacks/delete/{id}")]
    public async Task DeleteFeedback(long id)
    {
        await _service.Delete(id);
    }
    
    [HttpPut("/update/{id}")]
    public async Task<IActionResult> UpdateFeedback(long id, [FromBody] EditFeedbackRequest editFeedback)
    {
        await _service.UpdateFeedback(id, editFeedback);
        return Ok();
    }
}