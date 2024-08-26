using MeetingsAPI.DTO;
using MeetingsAPI.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace MeetingsAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[EnableCors]
	public class EmployeesController : ControllerBase
	{
		private readonly IEmployeeServices employeeServices;
		public EmployeesController(IEmployeeServices employeeServices)
		{
			this.employeeServices = employeeServices;
		}

		[HttpGet]
		public IActionResult GetEmployees()
		{
			return new JsonResult(employeeServices.GetEmployees());
		}

		[HttpPost]
		[Route("Email")]
		public IActionResult GetEmp(EmpDto empDto)
		{
			EmpDto emp = empDto;
			try
			{
				emp = employeeServices.GetEmpbyEmail(empDto);
				if (emp == null) throw new Exception("Email not found! Contact Admin");
			}
			catch (Exception ex)
			{
				return new JsonResult(ex.Message);
			}
			return new JsonResult(emp);
		}

		[HttpPost]
		public IActionResult AddEmployee(EmpDto empDto)
		{
			try
			{
				employeeServices.AddEmployee(empDto);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}

			return new JsonResult("Employee Added");
		}

		[HttpPut]
		[Route("ChangePassword")]
		public IActionResult UpdatePassword(EmpDto empDto)
		{
			try
			{
				employeeServices.UpdatePassword(empDto);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
			return new JsonResult("Password Updated Successfully");
		}

		[HttpPut]
		public IActionResult UpdateEmployee(EmpDto empDto)
		{
			try
			{
				employeeServices.UpdateEmployee(empDto);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
			return Ok("Updated Changes");
		}
	}
}
