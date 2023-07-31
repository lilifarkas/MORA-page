using backend.Models.Entities;
using backend.Models.Responses;
using backend.Services.TokenGenerators;

namespace backend.Services.Authenticator;

public class Authenticator
{
    private readonly AccessTokenGenerator _accessTokenGenerator;
    private readonly RefreshTokenGenerator _refreshTokenGenerator;

    public Authenticator(AccessTokenGenerator accessTokenGenerator, RefreshTokenGenerator refreshTokenGenerator)
    {
        _accessTokenGenerator = accessTokenGenerator;
        _refreshTokenGenerator = refreshTokenGenerator;
    }
    
    public async Task<AuthenticatedUserResponse> Authenticate(User user)
    {
        var accessToken = _accessTokenGenerator.GenerateToken(user);
        var refreshToken = _refreshTokenGenerator.GenerateToken();

       
        return new AuthenticatedUserResponse()
        {
            AccessToken =  accessToken,
            RefreshToken = refreshToken
        };
    }
}