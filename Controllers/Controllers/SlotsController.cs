using MeetingsAPI.Data;
using MeetingsAPI.DTO;
using MeetingsAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace MeetingsAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class SlotsController : ControllerBase
	{
		private readonly SlotServices slotServices;
		private readonly ProjectContext _projectContext;
		public SlotsController(ProjectContext projectContext, SlotServices slotServices) { this.slotServices = slotServices; this._projectContext = projectContext; }

		private List<RoomDto> _rooms = new List<RoomDto>();
		[HttpGet]
		public IActionResult GetSlots()
		{
			return new JsonResult(slotServices.GetSlots());
		}

		[HttpPost]
		[Route("SearchRoom")]
		public IActionResult GetRoomSlots(RoomDto room)
		{
			List<SlotDto> slots;
			try
			{
				slots=this.slotServices.GetSlotsByRoom(room);
			}
			catch (Exception ex)
			{
				return new JsonResult(ex.Message);
			}
			return new JsonResult(slots);
		}

		[HttpPost]
		[Route("Search")]
		public IActionResult GetUnavailable(SlotDto slotDto)
		{
			_rooms.Clear();
			try
			{
				this.slotServices.GetUnavailable(slotDto);
			}
			catch (Exception ex)
			{
				return new JsonResult(ex.Message);
			}


			return new JsonResult("Towards SlotBooking");
		}
		[HttpPut]
		public IActionResult DeleteSlot(SlotDto slotDto)
		{
			this.slotServices.delete(slotDto);
			return new JsonResult("Updated");
		}
		
		[HttpPost]
		public IActionResult AddSlots(SlotDto slotDto)
		{
			try
			{
				slotServices.AddSlot(slotDto);
			}
			catch (Exception ex)
			{
				return new JsonResult(ex.Message);
			}

			return new JsonResult("Slot Booked");
		}
	}
}
