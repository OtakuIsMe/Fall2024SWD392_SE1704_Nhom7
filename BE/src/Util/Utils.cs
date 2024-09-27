﻿using BE.src.Domains.Models;
using BE.src.Shared.Constant;
using BE.src.Shared.Type;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BE.src.Util
{
    public static class Utils
    {
        public static string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim("userId", user.Id.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JWT.SecretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                    issuer: JWT.Issuer,
                    audience: JWT.Audience,
                   claims: claims,
                   expires: DateTime.Now.AddDays(1),
                   signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public static Guid? GetUserIdByJWT(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadToken(token) as JwtSecurityToken;
            if (jwtToken == null)
            {
                return null;
            }
            Console.WriteLine(jwtToken);
            var userIdClaim = jwtToken.Claims.FirstOrDefault(claim => claim.Type == "userId")?.Value;
            Console.WriteLine(userIdClaim);
            if (Guid.TryParse(userIdClaim, out var userId))
            {
                return userId;
            }
            return null;
        }
    }
}