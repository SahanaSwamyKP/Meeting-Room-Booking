using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using MeetingsAPI.Services;
using MeetingsApi.Data;
using MeetingsAPI.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using MeetingsAPI.Data;

namespace MeetingsAPI.Tests
{
	[TestClass]
	public class SlotServicesTests
	{
		private Mock<MeetingsApiContext> _mockContext;
		private SlotServices _slotServices;

		[TestInitialize]
		public void Setup()
		{
			_mockContext = new Mock<MeetingsApiContext>();
			_slotServices = new SlotServices(_mockContext.Object);
		}

		[TestMethod]
		public void GetSlotsByRoom_Returns_CorrectSlots()
		{
			// Arrange
			var roomDto = new RoomDto { RoomId = 1 };
			var slots = new List<SlotTab>
			{
				new SlotTab { SlotId = 1, RoomId = 1, Date = DateOnly.FromDateTime(DateTime.Now), STime = TimeOnly.FromDateTime(DateTime.Now), ETime = TimeOnly.FromDateTime(DateTime.Now.AddHours(1)) },
				new SlotTab { SlotId = 2, RoomId = 2, Date = DateOnly.FromDateTime(DateTime.Now), STime = TimeOnly.FromDateTime(DateTime.Now), ETime = TimeOnly.FromDateTime(DateTime.Now.AddHours(1)) },
				new SlotTab { SlotId = 3, RoomId = 1, Date = DateOnly.FromDateTime(DateTime.Now), STime = TimeOnly.FromDateTime(DateTime.Now), ETime = TimeOnly.FromDateTime(DateTime.Now.AddHours(1)) }
			};

			_mockContext.Setup(x => x.SlotTabs).Returns((Microsoft.EntityFrameworkCore.DbSet<SlotTab>)slots.AsQueryable());

			// Act
			var result = _slotServices.GetSlotsByRoom(roomDto);

			// Assert
			Assert.AreEqual(2, result.Count);
			Assert.IsTrue(result.All(x => x.RoomId == roomDto.RoomId));
		}

		[TestMethod]
		[ExpectedException(typeof(Exception), "Empty Slot Error")]
		public void AddSlot_NullSlot_ThrowsException()
		{
			// Arrange
			SlotDto slotDto = null;

			// Act
			_slotServices.AddSlot(slotDto);

			// Assert
			// Exception is expected
		}

		[TestMethod]
		public void AddSlot_ValidSlot_AddsSlot()
		{
			// Arrange
			var slotDto = new SlotDto { SlotId = 1, RoomId = 1, Date = DateTime.Now, STime = DateTime.Now.AddHours(1), ETime = DateTime.Now.AddHours(2) };
			var slots = new List<SlotTab>();

			_mockContext.Setup(x => x.SlotTabs).Returns((Microsoft.EntityFrameworkCore.DbSet<SlotTab>)slots.AsQueryable());

			// Act
			_slotServices.AddSlot(slotDto);

			// Assert
			_mockContext.Verify(x => x.SlotTabs.Add(It.IsAny<SlotTab>()), Times.Once);
			_mockContext.Verify(x => x.SaveChanges(), Times.Once);
		}

		[TestMethod]
		[ExpectedException(typeof(Exception), "Slot in this room is already booked")]
		public void AddSlot_OverlappingSlot_ThrowsException()
		{
			// Arrange
			var slotDto = new SlotDto { SlotId = 1, RoomId = 1, Date = DateTime.Now, STime = DateTime.Now.AddHours(1), ETime = DateTime.Now.AddHours(2) };
			var slots = new List<SlotTab>
			{
				new SlotTab { SlotId = 2, RoomId = 1, Date = DateOnly.FromDateTime(DateTime.Now), STime = TimeOnly.FromDateTime(DateTime.Now.AddHours(1)), ETime = TimeOnly.FromDateTime(DateTime.Now.AddHours(3)) }
			};

			_mockContext.Setup(x => x.SlotTabs).Returns((Microsoft.EntityFrameworkCore.DbSet<SlotTab>)slots.AsQueryable());

			// Act
			_slotServices.AddSlot(slotDto);

			// Assert
			// Exception is expected
		}

		// Add more tests for other methods like delete, GetSlots, GetUnavailable, etc.
	}
}