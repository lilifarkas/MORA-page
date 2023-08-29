using backend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.FeedbackService;

public class FeedbackService : IFeedbackService
{
    private readonly MedicalContext _context;

    public FeedbackService(MedicalContext context)
    {
        _context = context;
    }
    
    public async Task<Feedback> Add(Feedback feedback)
    {
        var user = await _context.Users.FirstAsync(t => t.ID == feedback.UserId);
        if (user != null)
        {
            user.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();
        }
        else
        {
            throw new InvalidOperationException("User not found.");
        }
        return await _context.Feedbacks
            .Where(p => p.ID == feedback.ID)
            .FirstOrDefaultAsync() ?? throw new InvalidOperationException();
    }

    public async Task<IEnumerable<Feedback>> GetAll()
    {
        return await _context.Feedbacks.ToListAsync();
    }

    public async Task Delete(long id)
    {
        var feedback = await _context.Feedbacks.FindAsync(id);
        if (feedback == null)
        {
            throw new ArgumentException($"Feedback with ID {id} not found.");
        }

        _context.Feedbacks.Remove(feedback);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<Feedback>> GetUserFeedback(long id)
    {
        return await _context.Users
            .Where(p => p.ID == id)
            .Select(x => x.Feedbacks)
            .FirstOrDefaultAsync() ?? throw new InvalidOperationException();
    }
}