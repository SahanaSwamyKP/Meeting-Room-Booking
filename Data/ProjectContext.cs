using Microsoft.EntityFrameworkCore;

namespace MeetingsAPI.Data
{
	public class ProjectContext : DbContext
	{
		public DbSet<EmpTab> EmpTabs { get; set; }
		public DbSet<RoomTab>	RoomTabs { get; set; }
		public DbSet<SlotTab> SlotTabs { get; set; }
		public ProjectContext(DbContextOptions options): base(options) { }	
	}
}
