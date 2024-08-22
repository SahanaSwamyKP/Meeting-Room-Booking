using MeetingsAPI.Data;
using MeetingsAPI.DTO;
using MeetingsAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MeetingsAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class RoomsController : ControllerBase
	{
		private readonly IRoomServices roomServices;
		public RoomsController(IRoomServices roomServices) { this.roomServices = roomServices;}

		[HttpGet]
		public List<RoomDto> GetRooms()
		{
			return roomServices.GetRooms();
		}

		[HttpPut]
		public IActionResult EditRoom(RoomDto room)
		{
			try
			{
				roomServices.EditRoom(room);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
			return Ok("Edit Successfull");
		}

		[HttpDelete]
		public IActionResult DeleteRoom(int roomId)
		{
			try
			{
				roomServices.DeleteRoom(roomId);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
			return Ok("Deleted Successfully");
		}

		[HttpPost]
		public IActionResult AddRooms(RoomDto room)
		{
			try
			{
				roomServices.AddRoom(room);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
			
			return Ok("Added Successfully");
		}

		[HttpGet("{id}")]
		public RoomDto GetRoomById(int id)
		{
			RoomDto rec;
			try
			{
				rec = roomServices.GetRoombyId(id);
			}
			catch (Exception)
			{
				throw;
			}

			return rec;
		}
	}
}
