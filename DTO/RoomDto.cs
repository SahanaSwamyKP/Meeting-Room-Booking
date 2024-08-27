using MeetingsAPI.Data;

namespace MeetingsAPI.DTO
{
	public class RoomDto
	{
		public int RoomId { get; set; }

		public string RoomName { get; set; }

		public int Capacity { get; set; }

		public bool Available { get; set; }


		public void RoomMap(RoomTab room)
		{
			this.RoomId = room.RoomId;
			this.RoomName = room.RoomName;
			this.Capacity = room.Capacity;
			this.Available = room.Available;
			
		}
	}
}