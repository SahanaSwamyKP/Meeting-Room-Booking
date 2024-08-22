
//using MeetingsAPI.Data;

using MeetingsAPI.Data;
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

			///////////////////////////////////
			builder.Services.AddDbContext<ProjectContext>();
			builder.Services.AddTransient<IEmployeeServices,EmployeeServices>();
			builder.Services.AddTransient<IRoomServices,RoomServices>();
			//builder.Services.AddTransient<ISlotServices, SlotServices>();

			builder.Services.AddCors(options =>
			{
				options.AddPolicy("cors", policy =>
				{
					policy.AllowAnyHeader();
					policy.AllowAnyMethod();
					policy.AllowAnyOrigin();
				});
			});
			//////////////////////////////////

			var app = builder.Build();
			app.UseCors("cors");
			// Configure the HTTP request pipeline.
			if (app.Environment.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI();
			}

			app.UseAuthorization();


			app.MapControllers();

			app.Run();
			
		}
	}
}
