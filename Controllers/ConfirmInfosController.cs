using ConfirmAPI.DTO;
using ConfirmAPI.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ConfirmAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[EnableCors]
	public class ConfirmInfosController : ControllerBase
	{
		public readonly IConfirmService confirmService;
		public ConfirmInfosController(IConfirmService confirmService) { this.confirmService = confirmService; }

		[HttpGet]
		public IActionResult GetAllInfo()
		{
			return new JsonResult(confirmService.GetAll());
		}

		[HttpPost]
		public IActionResult AddInfo(ConfirmInfoDto info)
		{
			try
			{
				confirmService.AddInfo(info);
			}
			catch (Exception ex)
			{
				return new JsonResult(ex.Message);
			}
			return new JsonResult("Added");
		}

		[HttpPut]
		public IActionResult UpdateConfirm(ConfirmInfoDto confir)
		{
			try
			{
				confirmService.UpdateConfirm(confir);
			}
			catch (Exception ex)
			{
				return new JsonResult(ex.Message);
			}
			return new JsonResult("Confirmed");
		}
	}
}
