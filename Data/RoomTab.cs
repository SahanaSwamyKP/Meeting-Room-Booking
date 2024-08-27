using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using MeetingsAPI.DTO;

namespace MeetingsAPI.Data
{
	[Table("RoomTab")]
	public class RoomTab
	{
		[Key]
		public int RoomId { get; set; }

		public string RoomName { get; set; }

		public int Capacity { get; set; }

		public bool Available { get; set; }

		public void RoomMap(RoomDto room)
		{
			this.RoomId = room.RoomId;
			this.RoomName = room.RoomName;
			this.Capacity = room.Capacity;
			this.Available = room.Available;
		}
	}
}
