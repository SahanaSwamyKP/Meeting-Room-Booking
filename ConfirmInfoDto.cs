using ConfirmAPI.Data;

namespace ConfirmAPI.DTO
{
	public class ConfirmInfoDto
	{
		public int ConfirmId { get; set; }
		public int SlotId { get; set; }
		public string EmpEmail { get; set; }
		public Boolean Confirm { get; set; }

		public void MapData(ConfirmInfo data)
		{
			this.ConfirmId = data.ConfirmId;
			this.SlotId = data.SlotId;
			this.EmpEmail = data.EmpEmail;
			this.Confirm = data.Confirm;
		}
	}
}
