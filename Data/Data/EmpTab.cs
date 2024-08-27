using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MeetingsAPI.DTO;

namespace MeetingsAPI.Data
{
	[Table("EmpTab")]
	public partial class EmpTab
	{
		[Key]
		public int EmpId { get; set; }

		public string EmpName { get; set; } = null!;

		public string EmpRole { get; set; } = null!;

		public string EmpEmail { get; set; } = null!;

		public string EmpPassword { get; set; } = null!;

		public bool Available { get; set; }

		public virtual ICollection<SlotTab> SlotTabs { get; set; } = new List<SlotTab>();

		public void EmpMap(EmpDto emp)
		{
			this.EmpId = emp.EmpId;
			this.EmpName = emp.EmpName;
			this.EmpRole = emp.EmpRole;
			this.EmpEmail = emp.EmpEmail;
			this.EmpPassword = emp.EmpPassword;
			this.Available = emp.Available;
			foreach (var slot in emp.SlotTabs)
			{
				SlotTab slotTab = new SlotTab();
				slotTab.SlotMap(slot);
				this.SlotTabs.Add(slotTab);
			}
		}
	}
}