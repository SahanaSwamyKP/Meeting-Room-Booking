using MeetingsAPI.Data;

namespace MeetingsAPI.DTO
{
	public class SlotDto : IComparable<SlotDto>
	{
		public int SlotId { get; set; }

		public int? RoomId { get; set; }

		public int? EmpId { get; set; }

		public DateTime Date { get; set; }

		public DateTime STime { get; set; }

		public DateTime ETime { get; set; }

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
			Date = slot.Date.ToDateTime(new TimeOnly());
			this.Active = slot.Active;
			this.STime = new DateTime(slot.Date,slot.STime);
			this.ETime = new DateTime(slot.Date,slot.ETime);
			
			EmpDto? emp = new();
			if (slot.Emp != null)
			{
				emp.EmpMap(slot.Emp); 
				this.Emp = emp;
			}
			else
			{
				this.Emp = null;
			}

			RoomDto? room = new();
			if (slot.Room != null)
			{
				room.RoomMap(slot.Room);
				this.Room = room;
			}
			else
			{
				this.Room = null;
			}
		}
	}
}
