
using ConfirmAPI.Data;
using ConfirmAPI.Services;
using Microsoft.EntityFrameworkCore;

namespace ConfirmAPI
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
			builder.Services.AddDbContext<ConfirmContext>(options =>
			{
				options.UseSqlServer(builder.Configuration.GetConnectionString("MyConnection"));
			});
			builder.Services.AddCors(options =>
			{
				options.AddPolicy("cors", policy =>
				{
					policy.AllowAnyHeader();
					policy.AllowAnyMethod();
					policy.AllowAnyOrigin();
				});
			});
			builder.Services.AddTransient<IConfirmService,ConfirmService>();
			var app = builder.Build();

			// Configure the HTTP request pipeline.
			if (app.Environment.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI();
			}

			app.UseAuthorization();

			app.UseCors("cors");
			app.MapControllers();

			app.Run();
		}
	}
}
