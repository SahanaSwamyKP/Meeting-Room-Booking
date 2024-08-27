using MeetingsAPI.Data;

namespace MeetingsAPI.DTO
{
	public class EmpDto
	{
		public int EmpId { get; set; }

		public string EmpName { get; set; }

		public string EmpRole { get; set; }

		public string EmpEmail { get; set; }

		public string EmpPassword { get; set; }

		public bool Available { get; set; }

		public void EmpMap(EmpTab emp)
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