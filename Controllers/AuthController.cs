using MeetingsAPI.DTO;
using MeetingsAPI.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CoreWebApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[EnableCors("cors")]
	public class AuthController : ControllerBase
	{
		private readonly IConfiguration _configuration;
		private readonly IEmployeeServices employeeServices;
		private const string privateKey = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		public AuthController(IConfiguration configuration, IEmployeeServices Employeeservices)
		{
			_configuration = configuration;
			this.employeeServices = Employeeservices;
		}

		[HttpPost("login")]
		public IActionResult Login(EmpDto empDto)
		{
			{
				// Validate the user credentials (this is just a dummy check, replace with your logic)
				try
				{
					EmpDto? emp = this.employeeServices.GetEmailForChange(empDto);
					if (emp != null)
					{
						var token = GenerateJwtToken(emp.EmpName);
						return Ok(new { token });
					}
					else
					{
						return new JsonResult(Unauthorized());
					}
				}
				catch (Exception ex)
				{
					return new JsonResult(ex.Message);
				}

			}

		}
		private string GenerateJwtToken(string username)
		{
			var key = Encoding.UTF8.GetBytes(privateKey);
			var tokenDesc = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(new[]
			{
				new Claim(ClaimTypes.Name, username)
			}),
				Expires = DateTime.UtcNow.AddHours(1),
				SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
			};
			var tokenHandler = new JwtSecurityTokenHandler();
			var token = tokenHandler.CreateToken(tokenDesc);
			return tokenHandler.WriteToken(token);
		}
	}
}