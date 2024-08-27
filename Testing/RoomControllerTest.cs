using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using MeetingsAPI.Controllers;
using MeetingsAPI.DTO;
using MeetingsAPI.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace MeetingsAPI.Tests
{
	[TestClass]
	public class RoomsControllerTests
	{
		private Mock<IRoomServices> _mockRoomServices;
		private RoomsController _controller;

		[TestInitialize]
		public void Setup()
		{
			_mockRoomServices = new Mock<IRoomServices>();
			_controller = new RoomsController(_mockRoomServices.Object);
		}

		[TestMethod]
		public void GetRooms_ReturnsOkResult_WithListOfRooms()
		{
			// Arrange
			var rooms = new List<RoomDto>
			{
				new RoomDto { RoomId = 1, RoomName = "Room A" },
				new RoomDto { RoomId = 2, RoomName = "Room B" }
			};
			_mockRoomServices.Setup(service => service.GetRooms()).Returns(rooms);

			// Act
			var result = _controller.GetRooms();

			// Assert
			Assert.IsNotNull(result);
			Assert.AreEqual(2, result.Count);
		}

		[TestMethod]
		public void EditRoom_ValidRoom_ReturnsOkResult()
		{
			// Arrange
			var room = new RoomDto { RoomId = 1, RoomName = "Room A" };

			// Act
			var result = _controller.EditRoom(room);

			// Assert
			Assert.IsInstanceOfType(result, typeof(OkResult));
		}

		[TestMethod]
		public void DeleteRoom_ValidRoomId_ReturnsOkResult()
		{
			// Arrange
			var roomId = 1;

			// Act
			var result = _controller.DeleteRoom(roomId);

			// Assert
			Assert.IsInstanceOfType(result, typeof(OkResult));
		}

		[TestMethod]
		public void AddRooms_ValidRoom_ReturnsOkResult()
		{
			// Arrange
			var room = new RoomDto { RoomId = 1, RoomName = "Room A" };

			// Act
			var result = _controller.AddRooms(room);

			// Assert
			Assert.IsInstanceOfType(result, typeof(OkResult));
		}

		[TestMethod]
		public void GetRoomById_ValidId_ReturnsRoomDto()
		{
			// Arrange
			var roomId = 1;
			var room = new RoomDto { RoomId = 1, RoomName = "Room A" };
			_mockRoomServices.Setup(service => service.GetRoombyId(roomId)).Returns(room);

			// Act
			var result = _controller.GetRoomById(roomId);

			// Assert
			Assert.IsNotNull(result);
			Assert.AreEqual(roomId, result.RoomId);
		}

		[TestMethod]
		public void UpdateRoom_ValidId_ReturnsOkResult()
		{
			// Arrange
			var roomDto = new RoomDto { RoomId = 1, RoomName = "Updated Room" };
			var roomId = 1;

			// Act
			var result = _controller.UpdateRoom(roomId, roomDto);

			// Assert
			Assert.IsInstanceOfType(result, typeof(OkResult));
		}

		[TestMethod]
		public void UpdateRoom_InvalidId_ReturnsBadRequest()
		{
			// Arrange
			var roomDto = new RoomDto { RoomId = 1, RoomName = "Updated Room" };
			var roomId = 0; // Invalid ID

			// Act
			var result = _controller.UpdateRoom(roomId, roomDto);

			// Assert
			Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
			var badRequestResult = result as BadRequestObjectResult;
			Assert.AreEqual("Invalid room ID.", badRequestResult.Value);
		}

		[TestMethod]
		public void UpdateRoom_InternalServerError_ReturnsStatusCode500()
		{
			// Arrange
			var roomDto = new RoomDto { RoomId = 1, RoomName = "Updated Room" };
			var roomId = 1;

			_mockRoomServices.Setup(service => service.UpdateRoom(roomId, roomDto)).Throws(new Exception("Internal error"));

			// Act
			var result = _controller.UpdateRoom(roomId, roomDto);

			// Assert
			Assert.IsInstanceOfType(result, typeof(ObjectResult));
			var ObjectResult = result as ObjectResult;
			Assert.AreEqual(500, ObjectResult.StatusCode);
		}
	}
}
