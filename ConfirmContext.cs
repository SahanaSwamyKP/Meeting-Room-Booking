using Microsoft.EntityFrameworkCore;

namespace ConfirmAPI.Data
{
	public class ConfirmContext : DbContext
	{
		public DbSet<ConfirmInfo> ConfirmInfos { get; set; }

		public ConfirmContext(DbContextOptions options) :base(options) { }
	}
}
