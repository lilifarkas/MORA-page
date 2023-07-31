namespace backend.Services.PasswordHasher;

public interface IPasswordHasher
{
    string HashPassword(string password);
    
    bool VerifyPassword(string password, string passwordHash);
}