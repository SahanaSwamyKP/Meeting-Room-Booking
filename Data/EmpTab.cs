using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using MeetingsAPI.DTO;

namespace MeetingsAPI.Data
{
	[Table("EmpTab")]
	public class EmpTab
	{
		[Key]
		public int EmpId { get; set; }

		public string EmpName { get; set; }

		public string EmpRole { get; set; }

		public string EmpEmail { get; set; }

		public string EmpPassword { get; set; }

		public bool Available { get; set; }

		public void EmpMap(EmpDto emp)
		{
			this.EmpId = emp.EmpId;
			this.EmpName = emp.EmpName;
			this.EmpRole = emp.EmpRole;
			this.EmpEmail = emp.EmpEmail;
			this.EmpPassword = emp.EmpPassword;
			this.Available = emp.Available;
		}
	}
}
