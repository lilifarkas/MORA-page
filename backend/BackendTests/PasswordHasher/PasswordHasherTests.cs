using backend.Services.PasswordHasher;
using Microsoft.AspNetCore.Identity;

namespace BackendTests.PasswordHasher;

public class PasswordHasherTests
{
    private IPasswordHasher _passwordHasher;

    [SetUp]
    public void SetUp()
    {
        _passwordHasher = new backend.Services.PasswordHasher.PasswordHasher();
    }

    [Test]
    public void HashPassword_ValidPassword_ReturnsHashedPassword()
    {
        // Arrange
        string password = "password123";

        // Act
        string hashedPassword = _passwordHasher.HashPassword(password);

        // Assert
        Assert.IsNotNull(hashedPassword);
        Assert.AreNotEqual(password, hashedPassword);
    }

    [Test]
    public void VerifyPassword_ValidPasswordAndHash_ReturnsTrue()
    {
        // Arrange
        string password = "password123";
        string hashedPassword = _passwordHasher.HashPassword(password);

        // Act
        bool result = _passwordHasher.VerifyPassword(password, hashedPassword);

        // Assert
        Assert.IsTrue(result);
    }

    [Test]
    public void VerifyPassword_InvalidPasswordAndHash_ReturnsFalse()
    {
        // Arrange
        string password = "password123";
        string invalidPassword = "wrongpassword";
        string hashedPassword = _passwordHasher.HashPassword(password);

        // Act
        bool result = _passwordHasher.VerifyPassword(invalidPassword, hashedPassword);

        // Assert
        Assert.IsFalse(result);
    }
}