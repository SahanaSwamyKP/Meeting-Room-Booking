using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MeetingsAPI.DTO;

namespace MeetingsAPI.Data
{
	[Table("RoomTab")]
	public partial class RoomTab
	{
		[Key]
		public int RoomId { get; set; }

		public string RoomName { get; set; } = null!;

		public int Capacity { get; set; }

		public bool Available { get; set; }

		public virtual ICollection<SlotTab> SlotTabs { get; set; } = new List<SlotTab>();

		public void RoomMap(RoomDto room)
		{
			this.RoomId = room.RoomId;
			this.RoomName = room.RoomName;
			this.Capacity = room.Capacity;
			this.Available = room.Available;
			foreach (var slot in room.SlotTabs)
			{
				SlotTab slotTab = new SlotTab();
				slotTab.SlotMap(slot);
				this.SlotTabs.Add(slotTab);
			}
		}
	}
}