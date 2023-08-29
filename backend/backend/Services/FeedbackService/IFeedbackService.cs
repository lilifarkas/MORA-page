using backend.Models.Entities;

namespace backend.Services.FeedbackService;

public interface IFeedbackService
{
    public Task<Feedback> Add(Feedback feedback);
    public Task<IEnumerable<Feedback>> GetAll();
    public Task Delete(long id);
    public Task<IEnumerable<Feedback>> GetUserFeedback(long id);
}