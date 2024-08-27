using Microsoft.VisualStudio.TestTools.UnitTesting;
using MeetingsAPI.Services;
using MeetingsAPI.DTO;
using MeetingsApi.Data;
using Moq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace MeetingsApi.Tests
{
	[TestClass]
	public class EmployeeServicesTests
	{
		private Mock<MeetingsApiContext> _mockContext;
		private EmployeeServices _employeeServices;
		private List<EmpTab> _empTabData;

		[TestInitialize]
		public void Setup()
		{
			// Setup mock data
			_empTabData = new List<EmpTab>
			{
				new EmpTab { EmpId = 1, EmpEmail = "test1@example.com", EmpName = "Test User 1", EmpPassword = "hashedpassword1", EmpRole = "Admin", Available = true },
				new EmpTab { EmpId = 2, EmpEmail = "test2@example.com", EmpName = "Test User 2", EmpPassword = "hashedpassword2", EmpRole = "Employee", Available = true }
			};

			var mockSet = new Mock<DbSet<EmpTab>>();
			mockSet.As<IQueryable<EmpTab>>().Setup(m => m.Provider).Returns(_empTabData.AsQueryable().Provider);
			mockSet.As<IQueryable<EmpTab>>().Setup(m => m.Expression).Returns(_empTabData.AsQueryable().Expression);
			mockSet.As<IQueryable<EmpTab>>().Setup(m => m.ElementType).Returns(_empTabData.AsQueryable().ElementType);
			mockSet.As<IQueryable<EmpTab>>().Setup(m => m.GetEnumerator()).Returns(_empTabData.AsQueryable().GetEnumerator());

			_mockContext = new Mock<MeetingsApiContext>();
			_mockContext.Setup(c => c.EmpTabs).Returns(mockSet.Object);

			_employeeServices = new EmployeeServices(_mockContext.Object);
		}

		[TestMethod]
		public void AddEmployee_ShouldAddNewEmployee()
		{
			// Arrange
			var newEmployee = new EmpDto { EmpEmail = "newuser@example.com", EmpName = "New User", EmpPassword = "password", EmpRole = "Employee", Available = true };

			// Act
			_employeeServices.AddEmployee(newEmployee);

			// Assert
			_mockContext.Verify(c => c.EmpTabs.Add(It.IsAny<EmpTab>()), Times.Once());
			_mockContext.Verify(c => c.SaveChanges(), Times.Once());
		}

		[TestMethod]
		public void GetEmployees_ShouldReturnAllEmployees()
		{
			// Act
			var result = _employeeServices.GetEmployees();

			// Assert
			Assert.AreEqual(2, result.Count);
		}

		[TestMethod]
		[ExpectedException(typeof(Exception), "Employee Doesn't Exist")]
		public void GetEmpbyId_ShouldThrowExceptionIfEmployeeDoesNotExist()
		{
			// Arrange
			var nonExistentEmp = new EmpDto { EmpId = 3 };

			// Act
			_employeeServices.GetEmpbyId(nonExistentEmp);
		}

		[TestMethod]
		public void GetEmpbyEmail_ShouldReturnEmployeeIfEmailExists()
		{
			// Arrange
			var existingEmp = new EmpDto { EmpEmail = "test1@example.com", EmpPassword = "password" };

			// Act
			var result = _employeeServices.GetEmpbyEmail(existingEmp);

			// Assert
			Assert.IsNotNull(result);
			Assert.AreEqual("test1@example.com", result.EmpEmail);
		}

		[TestMethod]
		public void UpdatePassword_ShouldUpdateEmployeePassword()
		{
			// Arrange
			var existingEmp = new EmpDto { EmpEmail = "test1@example.com", EmpPassword = "newpassword" };

			// Act
			_employeeServices.UpdatePassword(existingEmp);

			// Assert
			_mockContext.Verify(c => c.SaveChanges(), Times.Once());
		}
	}
}