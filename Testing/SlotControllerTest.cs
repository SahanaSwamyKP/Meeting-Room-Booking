using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using MeetingsAPI.Controllers;
using MeetingsAPI.DTO;
using MeetingsAPI.Services;
using System;
using System.Collections.Generic;
using MeetingsApi.Data;

namespace MeetingsAPI.Tests
{
	[TestClass]
	public class SlotsControllerTests
	{
		private Mock<SlotServices> _mockSlotServices;
		private SlotsController _controller;
		private Mock<MeetingsApiContext> _mockProjectContext;

		[TestInitialize]
		public void Setup()
		{
			_mockSlotServices = new Mock<SlotServices>();
			_controller = new SlotsController(null, _mockSlotServices.Object); // Assuming MeetingsApiContext is not required for unit tests
			_mockProjectContext = new Mock<MeetingsApiContext>();
		}

		[TestMethod]
		public void GetSlots_ReturnsOkResult_WithListOfSlots()
		{
			// Arrange
			var slots = new List<SlotDto> { new SlotDto { /* Initialize properties */ } };
			_mockSlotServices.Setup(service => service.GetSlots()).Returns(slots);

			// Act
			var result = _controller.GetSlots() as JsonResult;

			// Assert
			Assert.IsNotNull(result);
			var returnedSlots = result.Value as List<SlotDto>;
			Assert.AreEqual(slots.Count, returnedSlots.Count);
		}
		[TestMethod]
		public void GetSlots_ShouldReturnSlots()
		{
			// Arrange
			var expectedSlots = new List<SlotDto> { new SlotDto(), new SlotDto() };
			_mockSlotServices.Setup(service => service.GetSlots()).Returns(expectedSlots);

			// Act
			var result = _controller.GetSlots() as JsonResult;

			// Assert
			Assert.IsNotNull(result);
			Assert.AreEqual(expectedSlots, result.Value);
		}


		[TestMethod]
		public void GetRoomSlots_ReturnsOkResult_WithListOfSlots()
		{
			// Arrange
			var roomDto = new RoomDto { /* Initialize properties */ };
			var slots = new List<SlotDto> { new SlotDto { /* Initialize properties */ } };
			_mockSlotServices.Setup(service => service.GetSlotsByRoom(roomDto)).Returns(slots);

			// Act
			var result = _controller.GetRoomSlots(roomDto) as JsonResult;

			// Assert
			Assert.IsNotNull(result);
			var returnedSlots = result.Value as List<SlotDto>;
			Assert.AreEqual(slots.Count, returnedSlots.Count);
		}

		[TestMethod]
		public void GetUnavailable_ReturnsOkResult_WithMessage()
		{
			// Arrange
			var slotDto = new SlotDto { /* Initialize properties */ };
			_mockSlotServices.Setup(service => service.GetUnavailable(slotDto)).Verifiable();

			// Act
			var result = _controller.GetUnavailable(slotDto) as JsonResult;

			// Assert
			Assert.IsNotNull(result);
			Assert.AreEqual("Towards SlotBooking", result.Value);
			_mockSlotServices.Verify();
		}

		[TestMethod]
		public void DeleteSlot_ReturnsOkResult_WithMessage()
		{
			// Arrange
			var slotDto = new SlotDto { /* Initialize properties */ };
			_mockSlotServices.Setup(service => service.delete(slotDto)).Verifiable();

			// Act
			var result = _controller.DeleteSlot(slotDto) as JsonResult;

			// Assert
			Assert.IsNotNull(result);
			Assert.AreEqual("Updated", result.Value);
			_mockSlotServices.Verify();
		}

		[TestMethod]
		public void AddSlots_ReturnsOkResult_WithMessage()
		{
			// Arrange
			var slotDto = new SlotDto { /* Initialize properties */ };
			_mockSlotServices.Setup(service => service.AddSlot(slotDto)).Verifiable();

			// Act
			var result = _controller.AddSlots(slotDto) as JsonResult;

			// Assert
			Assert.IsNotNull(result);
			Assert.AreEqual("Slot Booked", result.Value);
			_mockSlotServices.Verify();
		}
	}
}
