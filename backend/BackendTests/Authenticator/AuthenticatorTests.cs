using backend.Models;
using backend.Models.Entities;
using backend.Services.TokenGenerators;
using Moq;

namespace BackendTests.Authenticator;

public class AuthenticatorTests
{
    private backend.Services.Authenticator.Authenticator _authenticator;
    private AccessTokenGenerator _accessTokenGenerator;
    private RefreshTokenGenerator _refreshTokenGenerator;

    [SetUp]
    public void SetUp()
    {
        var configuration = new AuthenticationConfiguration
        {
            AccessTokenSecret = "1uamQdkXV4copN0XTeWAvgb2LY8t12-5S72DVjbTM6e1Nt3PhZRZhRHvwjs8kvnKEp-cjdnJdG7XZOcYVFcB4dhx-f5sp2ySEBrYkan-mteDgYkpKnssuUXxFo_dLZZjpsGeCluybfAd-5q_ThZzY8cVOE-YblOkxkEOrboQoFPM",
            AccessTokenExpirationMinutes = 60,
            Issuer = "http://localhost:7230",
            Audience = "http://localhost:3000",
            RefreshTokenSecret = "8z3sKHFYydGWdfkkIA5lTMbfZs0jw-EnbyTvRQzRiMidbk0XLA2WoITR_1Ecxwuy8uwpcezk4PYcl1IZsv80voWsai1AT-8WyjECDp1iNtoLrHx5sGcKyGX35UazurdDOwEZikdPnC67AdfQhNRrJ_kgXyn5yXqM4rhHRc5Q200",
            RefreshTokenExpirationMinutes = 1440
        };

        var tokenGenerator = new TokenGenerator();
        _accessTokenGenerator = new AccessTokenGenerator(configuration, tokenGenerator);
        _refreshTokenGenerator = new RefreshTokenGenerator(configuration, tokenGenerator);
        _authenticator = new backend.Services.Authenticator.Authenticator(_accessTokenGenerator, _refreshTokenGenerator);
    }

    [Test]
    public async Task Authenticate_ValidUser_ReturnsAuthenticatedUserResponse()
    {
        // Arrange
        var user = new User
        {
            ID = 1,
            Role = "admin",
            Email = "user@example.com",
            Phone = "1234567890"
        };
            
        // Act
        var result = await _authenticator.Authenticate(user);

        // Assert
        Assert.NotNull(result);
        Assert.NotNull(result.AccessToken);
        Assert.NotNull(result.RefreshToken);
    }
}