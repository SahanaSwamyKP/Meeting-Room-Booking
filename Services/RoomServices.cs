using MeetingsAPI.Data;
using MeetingsAPI.DTO;

namespace MeetingsAPI.Services
{
	public interface IRoomServices
	{
		void AddRoom(RoomDto room);
		void DeleteRoom(int roomId);
		void EditRoom(RoomDto room);
		RoomDto GetRoombyId(int Id);
		List<RoomDto> GetRooms();
	}

	public class RoomServices : IRoomServices
	{
		private readonly ProjectContext _projectContext;
		public RoomServices(ProjectContext projectContext) { this.RoomD = null; this._projectContext = projectContext; }

		public void EditRoom(RoomDto room)
		{
			var rec = GetRoombyId(room.RoomId) ?? throw new Exception("Room Doesn't Exist To Edit");
			if (room.Capacity != 10 && room.Capacity != 5 && room.Capacity != 15) throw new Exception("Room Capacity Error");
			rec.RoomName = room.RoomName;
			rec.Available = room.Available;
			rec.Capacity = room.Capacity;
			if (RoomD == null) throw new Exception("Room Doesn't Exist To Edit");
			RoomD.RoomMap(rec);
			_projectContext.SaveChanges();
		}
		RoomTab? RoomD;
		public RoomDto GetRoombyId(int Id)
		{
			this.RoomD = _projectContext.RoomTabs.FirstOrDefault(x => x.RoomId == Id) ?? throw new Exception("Room Doesn't Exist");

			var roomDto = new RoomDto();
			roomDto.RoomMap(this.RoomD);
			return roomDto;
		}
		public void DeleteRoom(int roomId)
		{
			var rec = _projectContext.RoomTabs.FirstOrDefault(x => x.RoomId == roomId) ?? throw new Exception("Room Doesn't Exist to Delete");
			_projectContext.Remove(rec);
			_projectContext.SaveChanges();
		}

		public List<RoomDto> GetRooms()
		{
			var RoomList = _projectContext.RoomTabs.ToList();
			var RoomDtoList = new List<RoomDto>();
			foreach (var room in RoomList)
			{
				RoomDto roomDto = new RoomDto();
				roomDto.RoomMap(room);
				RoomDtoList.Add(roomDto);
			}
			return RoomDtoList;
		}

		public void AddRoom(RoomDto room)
		{
			if (room == null) throw new Exception("Room Cannont be NULL");
			if (room.Capacity != 10 && room.Capacity != 5 && room.Capacity != 15) throw new Exception("Room Capacity Error");
			var roomD = new RoomTab();
			roomD.RoomMap(room);
			_projectContext.RoomTabs.Add(roomD);
			_projectContext.SaveChanges();
		}
	}
}