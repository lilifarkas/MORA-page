using backend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class UserService: IUserService
{
    private readonly MedicalContext _context;

    public UserService(MedicalContext context)
    {
        _context = context;
    }
    public async Task<User> Add(User user)
    {
        _context.Users.Add(user);

        await _context.SaveChangesAsync();

        return await _context.Users
            .Where(p => p.ID == user.ID)
            .Include(p => p.Name)
            .Include(p => p.Email)
            .FirstOrDefaultAsync() ?? throw new InvalidOperationException();
    }

    public async Task<User> GetById(long id)
    {
        return await _context.Users.FirstOrDefaultAsync(t => t.ID == id);
    }
    
    public async Task<User> GetByEmail(string email)
    {
        return await _context.Users.FirstOrDefaultAsync(t => t.Email == email); 
    }

    public async Task<User> GetByName(string name)
    {
        return await _context.Users.FirstOrDefaultAsync(t => t.Name == name); 
    }

    public async Task<IEnumerable<User>> GetAll()
    {
        return await _context.Users.ToListAsync();
    }

    public async Task Update(User entity)
    {
        _context.Users.Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task Delete(long id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            throw new ArgumentException($"User with ID {id} not found.");
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
    }
}