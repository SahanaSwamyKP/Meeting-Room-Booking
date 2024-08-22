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


		[HttpGet]
		public List<SlotDto> GetSlots()
		{
			return slotServices.GetSlots();
		}

		[HttpGet]
		[Route("Available")]
		public IActionResult GetSlotsAvailable(DateOnly date,TimeOnly stime,TimeOnly etime)
		{
			
			var slot = _projectContext.SlotTabs.ToList();
			List<SlotTab> tabs = new List<SlotTab>();
			foreach (var x in slot)
			{
				if(x.Date == date && (stime >= x.STime && stime <= x.ETime) && x.Active == true)
				{
					tabs.Add(x);
				}
			}
			return Ok("Yet To Do");
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
				return BadRequest(ex.Message);
			}

			return Ok("Slot Booked");
		}
	}
}
