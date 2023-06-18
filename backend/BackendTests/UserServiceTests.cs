using backend;
using backend.Models.Entities;
using backend.Services;
using backend.Services.PasswordHasher;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace BackendTests;

public class Tests
{
    private DbContextOptions<MedicalContext> _dbContextOptions;
    
    [SetUp]
    public void Setup()
    {
        _dbContextOptions = new DbContextOptionsBuilder<MedicalContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;
    }

    [Test]
    public async Task Add_ShouldAddUserToDatabase()
    {
        // Arrange
        await using var context = new MedicalContext(_dbContextOptions);
        var passwordHasherMock = new Mock<IPasswordHasher>();
        var userService = new UserService(context, passwordHasherMock.Object);

        var user = new User { /* Set up user properties */ };

        // Act
        var result = await userService.Add(user);

        // Assert
        Assert.NotNull(result);
        Assert.That(result.ID, Is.EqualTo(user.ID));
        Assert.IsTrue(context.Users.Any(u => u.ID == result.ID));
    }
}