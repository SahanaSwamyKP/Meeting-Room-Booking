using MeetingsAPI.Data;

namespace MeetingsAPI.DTO
{
	public class SlotDto : IComparable<SlotDto>
	{
		public int SlotId { get; set; }

		public int? RoomId { get; set; }

		public int? EmpId { get; set; }

		public DateOnly Date { get; set; }

		public TimeOnly STime { get; set; }

		public TimeOnly ETime { get; set; }

		public bool Active { get; set; }

		public virtual EmpDto? Emp { get; set; }

		public virtual RoomDto? Room { get; set; }

		public int CompareTo(SlotDto? other)
		{
			if(this.Date == other.Date) return this.STime.CompareTo(other.STime);

			return this.Date.CompareTo(other.Date);
		}

		public void SlotMap(SlotTab slot)
		{
			this.SlotId = slot.SlotId;
			this.RoomId = slot.RoomId;
			this.EmpId = slot.EmpId;
			this.Date = slot.Date;
			this.Active = slot.Active;
			this.STime = slot.STime;
			this.ETime = slot.ETime;
			
			EmpDto? emp = new EmpDto();
			emp.EmpMap(slot.Emp);
			this.Emp = emp;

			RoomDto? room = new RoomDto();
			room.RoomMap(slot.Room);
			this.Room = room;
		}
	}
}
