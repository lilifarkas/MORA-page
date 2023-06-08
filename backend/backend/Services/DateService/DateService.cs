using backend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class DateService: IDateService
{
    private readonly MedicalContext _context;

    public DateService(MedicalContext context)
    {
        _context = context;
    }
    public async Task<BookedDate> Add(BookedDate date)
    {
        var user = await _context.Users.FirstAsync(t => t.ID == date.User.ID);
        if (user != null)
        {
            user.BookedDates.Add(date);
            await _context.SaveChangesAsync();
        }
        else
        {
            throw new InvalidOperationException("User not found.");
        }
        // _context.BookedDates.Add(date);
        //
        // await _context.SaveChangesAsync();

        return await _context.BookedDates
            .Where(p => p.ID == date.ID)
            .FirstOrDefaultAsync() ?? throw new InvalidOperationException();
    }

    public async Task<IEnumerable<BookedDate>> GetAll()
    {
        return await _context.BookedDates.ToListAsync();
    }

    public async Task Delete(long id)
    {
        var date = await _context.BookedDates.FindAsync(id);
        if (date == null)
        {
            throw new ArgumentException($"Date with ID {id} not found.");
        }

        _context.BookedDates.Remove(date);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<BookedDate>> GetUserDates(long id)
    {
        return await _context.Users
            .Where(p => p.ID == id)
            .Select(x => x.BookedDates)
            .FirstOrDefaultAsync() ?? throw new InvalidOperationException();
    }
}