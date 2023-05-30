using System.Security.Claims;
using backend.Models;
using backend.Models.Entities;

namespace backend.Services.TokenGenerators;

public class AccessTokenGenerator
{
    private readonly AuthenticationConfiguration _configuration;
    private readonly TokenGenerator _tokenGenerator;

    public AccessTokenGenerator(AuthenticationConfiguration configuration, TokenGenerator tokenGenerator)
    {
        _configuration = configuration;
        _tokenGenerator = tokenGenerator;
    }

    public string GenerateToken(User user)
    {
        var claims = new List<Claim>()
        {
            new Claim("id", user.ID.ToString()),
            new Claim(ClaimTypes.Role, user.Role),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.Phone)
        };


        return _tokenGenerator.GenerateToken(
            _configuration.AccessTokenSecret,
            _configuration.Issuer,
            _configuration.Audience,
            _configuration.AccessTokenExpirationMinutes,
            claims);
    }
}