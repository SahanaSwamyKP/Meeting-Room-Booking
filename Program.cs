using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using MeetingsAPI.Data;
using Microsoft.EntityFrameworkCore;
using MeetingsAPI.Services;

namespace MeetingsAPI
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);

			// Add services to the container.

			builder.Services.AddControllers();
			// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddSwaggerGen();

			///Adding JWT Tokens
			const string ApiKey = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			var key = Encoding.ASCII.GetBytes(ApiKey);

			builder.Services.AddAuthentication(x =>
			{
				x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
			})
			.AddJwtBearer(x =>
			{
				x.RequireHttpsMetadata = false;
				x.SaveToken = true;
				x.TokenValidationParameters = new TokenValidationParameters
				{
					ValidateIssuerSigningKey = true,
					ValidateIssuer = false,
					ValidateAudience = false,
					IssuerSigningKey = new SymmetricSecurityKey(key)
				};
			});

			//adding services and DBcontext
			builder.Services.AddDbContext<ProjectContext>(options =>
			{
				options.UseSqlServer(builder.Configuration.GetConnectionString("MyConnection"));
			});
			builder.Services.AddTransient<IEmployeeServices, EmployeeServices>();
			builder.Services.AddTransient<IRoomServices, RoomServices>();
			builder.Services.AddTransient<ISlotServices,SlotServices>();
			//adding cors
			builder.Services.AddCors(options =>
			{
				options.AddPolicy("cors", policy =>
				{
					policy.AllowAnyHeader();
					policy.AllowAnyMethod();
					policy.AllowAnyOrigin();
				});
			});

			var app = builder.Build();
			// Configure the HTTP request pipeline.
			if (app.Environment.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI();
			}

			app.UseAuthorization();
			//using cors
			app.UseCors("cors");
			//using authentication
			app.UseAuthentication();
			app.MapControllers();

			app.Run();
		}
	}
}
