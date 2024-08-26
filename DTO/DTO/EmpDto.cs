using MeetingsAPI.Data;

namespace MeetingsAPI.DTO
{
	public class EmpDto
	{
		public int EmpId { get; set; }

		public string EmpName { get; set; } = null!;

		public string EmpRole { get; set; } = null!;

		public string EmpEmail { get; set; } = null!;

		public string EmpPassword { get; set; } = null!;

		public bool Available { get; set; }

		public virtual ICollection<SlotDto> SlotTabs { get; set; } = new List<SlotDto>();

		public void EmpMap(EmpTab emp)
		{
			this.EmpId = emp.EmpId;
			this.EmpName = emp.EmpName;
			this.EmpRole = emp.EmpRole;
			this.EmpEmail = emp.EmpEmail;
			this.EmpPassword = emp.EmpPassword;
			this.Available = emp.Available;
			foreach(var slot in emp.SlotTabs)
			{
				SlotDto slotDto = new SlotDto();
				slotDto.SlotMap(slot);
				this.SlotTabs.Add(slotDto);
			}
		}
	}
}
