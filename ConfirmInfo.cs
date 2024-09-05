using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ConfirmAPI.DTO;

namespace ConfirmAPI.Data
{
	[Table("ConfirmData")]
	public class ConfirmInfo
	{
		[Key]
		public int ConfirmId { get; set; }
		public int SlotId { get; set; }
		public string EmpEmail { get; set; }
		public Boolean Confirm { get; set; }

		public void MapData(ConfirmInfoDto data)
		{
			this.ConfirmId = data.ConfirmId;
			this.SlotId = data.SlotId;
			this.EmpEmail = data.EmpEmail;
			this.Confirm = data.Confirm;
		}
	}
}
