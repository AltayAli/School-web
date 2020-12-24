using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using School.Enums;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace School.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        public TokenService(IConfiguration configuration)
        {
            _config = configuration;
        }
        public async Task<string> GenerateToken(string name,string surname, string username,string photoPath,Roles role)
        => await Task.Run(() =>
            {
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:SecretKey"]));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var claims = new[]
                {
                new Claim(JwtRegisteredClaimNames.Sub,$"{surname} {name}"),
                new Claim(JwtRegisteredClaimNames.UniqueName,username),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Typ, role.ToString()),
                new Claim(JwtRegisteredClaimNames.Prn, photoPath)
             };

                return new JwtSecurityTokenHandler().WriteToken(new JwtSecurityToken(
                        _config["JWT:Issuer"],
                        $"{surname} {name}",
                        claims,
                        expires: DateTime.Now.AddMinutes(30),
                        signingCredentials: credentials
                    ));
            }).ConfigureAwait(false);
    }
}
