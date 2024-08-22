using System;
using System.Collections.Generic;
using MeetingsAPI.DTO;

namespace MeetingsAPI.Data
{

    public partial class SlotTab : IComparable<SlotTab>
    {
        public int SlotId { get; set; }

        public int? RoomId { get; set; }

        public int? EmpId { get; set; }

        public DateOnly Date { get; set; }

        public TimeOnly STime { get; set; }

        public TimeOnly ETime { get; set; }

        public bool Active { get; set; }

        public virtual EmpTab? Emp { get; set; }

        public virtual RoomTab? Room { get; set; }

        public int CompareTo(SlotTab? other)
        {
            if (this.Date != other.Date) return this.Date.CompareTo(other.Date);

            return this.STime.CompareTo(other.STime);
        }

        public void SlotMap(SlotDto slot)
        {
            this.SlotId = slot.SlotId;
            this.RoomId = slot.RoomId;
            this.EmpId = slot.EmpId;
            this.Date = slot.Date;
            this.Active = slot.Active;
            this.STime = slot.STime;
            this.ETime = slot.ETime;

			EmpTab? emp = new EmpTab();
			emp.EmpMap(slot.Emp);
			this.Emp = emp;

			RoomTab? room = new RoomTab();
			room.RoomMap(slot.Room);
			this.Room = room;

		}
    }

}