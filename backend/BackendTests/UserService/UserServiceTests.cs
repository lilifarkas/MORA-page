using backend;
using backend.Models.Entities;
using backend.Models.Requests;
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

        var user = new User
        {
            Name = "Bela", 
            Email = "bela@bela.com",
            Phone = "1234567",
            BookedDates = new List<BookedDate>(),
            Password = "test",
            Role = ""
        };

        // Act
        var result = await userService.Add(user);

        // Assert
        Assert.NotNull(result);
        Assert.That(result.ID, Is.EqualTo(user.ID));
        Assert.IsTrue(context.Users.Any(u => u.ID == result.ID));
    }
    
    [Test]
    public async Task GetById_ShouldReturnUser()
    {
        // Arrange
        await using var context = new MedicalContext(_dbContextOptions);
        var passwordHasherMock = new Mock<IPasswordHasher>();
        var userService = new UserService(context, passwordHasherMock.Object);

        var user = new User
        {
            Name = "Bela", 
            Email = "bela@bela.com",
            Phone = "1234567",
            BookedDates = new List<BookedDate>(),
            Password = "test",
            Role = ""
        };
        context.Users.Add(user);
        await context.SaveChangesAsync();

        // Act
        var result = await userService.GetById(user.ID);

        // Assert
        Assert.NotNull(result);
        Assert.That(result.ID, Is.EqualTo(user.ID));
    }
    
    [Test]
    public async Task GetByEmail_ShouldReturnUserWithEmail()
    {
        // Arrange
        await using var context = new MedicalContext(_dbContextOptions);
        var passwordHasherMock = new Mock<IPasswordHasher>();
        var userService = new UserService(context, passwordHasherMock.Object);

        var email = "bela@bela.com";
        var user = new User
        {
            Name = "Bela",
            Email = email,
            Phone = "1234567",
            BookedDates = new List<BookedDate>(),
            Password = "test",
            Role = ""
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();

        // Act
        var result = await userService.GetByEmail(email);

        // Assert
        Assert.NotNull(result);
        Assert.That(result.Email, Is.EqualTo(email));
    }

    [Test]
    public async Task GetByName_ShouldReturnUserWithName()
    {
        // Arrange
        await using var context = new MedicalContext(_dbContextOptions);
        var passwordHasherMock = new Mock<IPasswordHasher>();
        var userService = new UserService(context, passwordHasherMock.Object);

        var name = "Bela";
        var user = new User
        {
            Name = name,
            Email = "bela@bela.com",
            Phone = "1234567",
            BookedDates = new List<BookedDate>(),
            Password = "test",
            Role = ""
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();

        // Act
        var result = await userService.GetByName(name);

        // Assert
        Assert.NotNull(result);
        Assert.That(result.Name, Is.EqualTo(name));
    }
    
    [Test]
        public async Task GetAll_ShouldReturnAllUsers()
        {
            // Arrange
            await using var context = new MedicalContext(_dbContextOptions);
            var passwordHasherMock = new Mock<IPasswordHasher>();
            var userService = new UserService(context, passwordHasherMock.Object);

            var users = new List<User>
            {
                new User
                {
                    Name = "Bela",
                    Email = "bela@bela.com",
                    Phone = "1234567",
                    BookedDates = new List<BookedDate>(),
                    Password = "test",
                    Role = ""
                },
                new User
                {
                    Name = "John",
                    Email = "john@john.com",
                    Phone = "9876543",
                    BookedDates = new List<BookedDate>(),
                    Password = "test",
                    Role = ""
                }
            };

            context.Users.AddRange(users);
            await context.SaveChangesAsync();

            // Act
            var result = await userService.GetAll();

            // Assert
            Assert.NotNull(result);
            Assert.That(result.Count(), Is.EqualTo(users.Count));
        }

        [Test]
        public async Task Update_ShouldUpdateUser()
        {
            // Arrange
            await using var context = new MedicalContext(_dbContextOptions);
            var passwordHasherMock = new Mock<IPasswordHasher>();
            var userService = new UserService(context, passwordHasherMock.Object);

            var user = new User
            {
                Name = "Bela",
                Email = "bela@bela.com",
                Phone = "1234567",
                BookedDates = new List<BookedDate>(),
                Password = "test",
                Role = ""
            };

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var editUser = new EditUserRequest
            {
                Name = "Updated Name",
                Email = "updated@bela.com",
                Phone = "9876543"
            };

            // Act
            await userService.Update(user, editUser);

            // Assert
            var updatedUser = await context.Users.FindAsync(user.ID);
            Assert.NotNull(updatedUser);
            Assert.That(updatedUser.Name, Is.EqualTo(editUser.Name));
            Assert.That(updatedUser.Email, Is.EqualTo(editUser.Email));
            Assert.That(updatedUser.Phone, Is.EqualTo(editUser.Phone));
        }

        // [Test]
        // public async Task ChangePassword_ShouldChangeUserPassword()
        // {
        //     // Arrange
        //     await using var context = new MedicalContext(_dbContextOptions);
        //     var passwordHasherMock = new Mock<IPasswordHasher>();
        //     var userService = new UserService(context, passwordHasherMock.Object);
        //
        //     long userId = 1L;
        //     var user = new User
        //     {
        //         ID = userId,
        //         Name = "Bela",
        //         Email = "bela@bela.com",
        //         Phone = "1234567",
        //         BookedDates = new List<BookedDate>(),
        //         Password = "test",
        //         Role = ""
        //     };
        //
        //     context.Users.Add(user);
        //     await context.SaveChangesAsync();
        //
        //     var changePasswordRequest = new ChangePasswordRequest
        //     {
        //         NewPassword = "newpassword"
        //     };
        //
        //     // Act
        //     await userService.ChangePassword(userId, changePasswordRequest);
        //
        //     // Assert
        //     var updatedUser = await context.Users.FindAsync(userId);
        //     Assert.NotNull(updatedUser);
        //     passwordHasherMock.Verify(
        //         hasher => hasher.HashPassword(changePasswordRequest.NewPassword),
        //         Times.Once);
        //     Assert.That(
        //         updatedUser.Password, Is.EqualTo(changePasswordRequest.NewPassword));
        // }
        
        [Test]
        public async Task ChangePassword_ShouldChangeUserPassword()
        {
            // Arrange
            await using var context = new MedicalContext(_dbContextOptions);
            var passwordHasherMock = new Mock<IPasswordHasher>();
            var userService = new UserService(context, passwordHasherMock.Object);

            long userId = 1L;
            var user = new User
            {
                ID = userId,
                Name = "Bela",
                Email = "bela@bela.com",
                Phone = "1234567",
                BookedDates = new List<BookedDate>(),
                Password = "test",
                Role = ""
            };

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var changePasswordRequest = new ChangePasswordRequest
            {
                NewPassword = "newpassword"
            };

            var expectedHashedPassword = "hashedPassword";
            passwordHasherMock
                .Setup(hasher => hasher.HashPassword(changePasswordRequest.NewPassword))
                .Returns(expectedHashedPassword);

            // Act
            await userService.ChangePassword(userId, changePasswordRequest);

            // Assert
            var updatedUser = await context.Users.FindAsync(userId);
            Assert.NotNull(updatedUser);
            Assert.AreEqual(expectedHashedPassword, updatedUser.Password);
        }

        [Test]
        public async Task Delete_ShouldDeleteUser()
        {
            // Arrange
            await using var context = new MedicalContext(_dbContextOptions);
            var passwordHasherMock = new Mock<IPasswordHasher>();
            var userService = new UserService(context, passwordHasherMock.Object);

            var user = new User
            {
                Name = "Bela",
                Email = "bela@bela.com",
                Phone = "1234567",
                BookedDates = new List<BookedDate>(),
                Password = "test",
                Role = ""
            };

            context.Users.Add(user);
            await context.SaveChangesAsync();

            // Act
            await userService.Delete(user.ID);

            // Assert
            var deletedUser = await context.Users.FindAsync(user.ID);
            Assert.IsNull(deletedUser);
        }
    
}