using backend.Models.Entities;
using backend.Models.Requests;
using backend.Services.PasswordHasher;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class UserService: IUserService
{
    private readonly MedicalContext _context;
    private readonly IPasswordHasher _passwordHasher;

    public UserService(MedicalContext context, IPasswordHasher passwordHasher)
    {
        _context = context;
        _passwordHasher = passwordHasher;
    }
    public async Task<User> Add(User user)
    {
        _context.Users.Add(user);

        await _context.SaveChangesAsync();

        return await _context.Users
            .Where(p => p.ID == user.ID)
            .FirstOrDefaultAsync() ?? throw new InvalidOperationException();
    }

    public async Task<User> GetById(long id)
    {
        return await _context.Users
            .Include(u => u.BookedDates)
            .FirstOrDefaultAsync(t => t.ID == id);
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

    public async Task Update(User user, EditUserRequest editUser)
    {
        if (user != null)
        {
            //_context.Entry(user).CurrentValues.SetValues(entity);
            user.Name = editUser.Name;
            user.Email = editUser.Email;
            user.Phone = editUser.Phone;
            await _context.SaveChangesAsync();
        }
        else
        {
            throw new InvalidOperationException("User not found.");
        }
    }

    public async Task ChangePassword(long id, ChangePasswordRequest changePasswordRequest)
    {
        var user = await _context.Users.FirstAsync(t => t.ID == id);
        
        if (user != null)
        {
            var passwordHash = _passwordHasher.HashPassword(changePasswordRequest.NewPassword);
            user.Password = passwordHash;
            await _context.SaveChangesAsync();
        }
        else
        {
            throw new InvalidOperationException("User not found.");
        }
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