using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using MeetingsAPI.Controllers;
using MeetingsAPI.DTO;
using MeetingsAPI.Services;

namespace MeetingsAPI.Tests
{
	[TestClass]
	public class EmployeesControllerTests
	{
		private Mock<IEmployeeServices> _mockEmployeeServices;
		private EmployeesController _controller;

		[TestInitialize]
		public void Setup()
		{
			_mockEmployeeServices = new Mock<IEmployeeServices>();
			_controller = new EmployeesController(_mockEmployeeServices.Object);
		}

		[TestMethod]
		public void GetEmployees_ReturnsOkResult_WithListOfEmployees()
		{
			// Arrange
			var employees = new List<EmpDto>
			{
				new EmpDto { EmpId = 1, EmpEmail = "test1@example.com" },
				new EmpDto { EmpId = 2, EmpEmail = "test2@example.com" }
			};
			_mockEmployeeServices.Setup(service => service.GetEmployees()).Returns(employees);

			// Act
			var result = _controller.GetEmployees();

			// Assert
			Assert.IsNotNull(result);
			Assert.AreEqual(2, result.Count);
		}

		[TestMethod]
		public void GetEmp_ValidEmail_ReturnsJsonResult_WithEmployee()
		{
			// Arrange
			var empDto = new EmpDto { EmpId = 1, EmpEmail = "test1@example.com" };
			_mockEmployeeServices.Setup(service => service.GetEmpbyEmail(empDto)).Returns(empDto);

			// Act
			var result = _controller.GetEmp(empDto) as JsonResult;

			// Assert
			Assert.IsNotNull(result);
			Assert.AreEqual(empDto, result.Value);
		}

		[TestMethod]
		public void GetEmp_InvalidEmail_ReturnsJsonResult_WithErrorMessage()
		{
			// Arrange
			var empDto = new EmpDto { EmpEmail = "invalid@example.com" };
			_mockEmployeeServices.Setup(service => service.GetEmpbyEmail(empDto)).Returns((EmpDto)null);

			// Act
			var result = _controller.GetEmp(empDto) as JsonResult;

			// Assert
			Assert.IsNotNull(result);
			Assert.AreEqual("Email not found! Contact Admin", result.Value);
		}

		[TestMethod]
		public void AddEmployee_ValidData_ReturnsOkResult()
		{
			// Arrange
			var empDto = new EmpDto { EmpId = 1, EmpEmail = "new@example.com" };

			// Act
			var result = _controller.AddEmployee(empDto);

			// Assert
			Assert.IsInstanceOfType(result, typeof(OkResult));
		}

		[TestMethod]
		public void UpdatePassword_ValidData_ReturnsOkResult()
		{
			// Arrange
			var empDto = new EmpDto { EmpId = 1, EmpEmail = "test@example.com" };

			// Act
			var result = _controller.UpdatePassword(empDto);

			// Assert
			Assert.IsInstanceOfType(result, typeof(OkResult));
		}

		[TestMethod]
		public void UpdateEmployee_ValidData_ReturnsOkResult()
		{
			// Arrange
			var empDto = new EmpDto { EmpId = 1, EmpEmail = "update@example.com" };

			// Act
			var result = _controller.UpdateEmployee(empDto);

			// Assert
			Assert.IsInstanceOfType(result, typeof(OkResult));
		}

		[TestMethod]
		public void UpdateEmployee_IdMismatch_ReturnsBadRequest()
		{
			// Arrange
			var empDto = new EmpDto { EmpId = 1, EmpEmail = "update@example.com" };
			var id = 2;

			// Act
			var result = _controller.UpdateEmployee(id, empDto);

			// Assert
			Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
			var badRequestResult = result as BadRequestObjectResult;
			Assert.AreEqual("Employee ID mismatch", badRequestResult.Value);
		}
	}
}