using MeetingsAPI.Data;

namespace MeetingsAPI.DTO
{
	public class RoomDto
	{
		public int RoomId { get; set; }

		public string RoomName { get; set; } = null!;

		public int Capacity { get; set; }

		public bool Available { get; set; }

		public virtual ICollection<SlotDto> SlotTabs { get; set; } = new List<SlotDto>();

		public void RoomMap(RoomTab room)
		{
			this.RoomId = room.RoomId;
			this.RoomName = room.RoomName;
			this.Capacity = room.Capacity;
			this.Available = room.Available;
			foreach(var slot in room.SlotTabs)
			{
				SlotDto slotDto = new SlotDto();
				slotDto.SlotMap(slot);
				this.SlotTabs.Add(slotDto);
			}
		}
	}
}
