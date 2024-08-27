using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MeetingsAPI.DTO;
using Microsoft.EntityFrameworkCore;

namespace MeetingsAPI.Data
{
	[Table("SlotTab")]
	public partial class SlotTab : IComparable<SlotTab>
	{
		[Key]
		public int SlotId { get; set; }

		[ForeignKey(nameof(RoomTab.RoomId))]
		public int? RoomId { get; set; }

		[ForeignKey(nameof(EmpTab.EmpId))]
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
			this.Date = DateOnly.FromDateTime(slot.Date);
			this.Active = slot.Active;
			this.STime = TimeOnly.FromDateTime(slot.STime);
			this.ETime = TimeOnly.FromDateTime(slot.ETime);

			EmpTab? emp = new EmpTab();
			if (slot.Emp != null) emp.EmpMap(slot.Emp);
			this.Emp = emp;

			RoomTab? room = new RoomTab();
			if (slot.Room != null) room.RoomMap(slot.Room);
			this.Room = room;

		}
	}

}