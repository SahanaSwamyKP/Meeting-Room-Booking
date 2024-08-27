using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using MeetingsAPI.Data;
using MeetingsAPI.DTO;
using MeetingsAPI.Services;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using MeetingsApi.Data;

namespace MeetingsApi.Tests
{
	[TestClass]
	public class RoomServicesTests
	{
		private RoomServices _roomServices;
		private Mock<MeetingsApiContext> _mockContext;

		[TestInitialize]
		public void Setup()
		{
			// Setup the mock context and DbSet
			var mockRoomSet = new Mock<DbSet<RoomTab>>();
			var roomData = new List<RoomTab>
			{
				new RoomTab { RoomId = 1, RoomName = "Room1", Capacity = 10, Available = true },
				new RoomTab { RoomId = 2, RoomName = "Room2", Capacity = 15, Available = true }
			}.AsQueryable();

			mockRoomSet.As<IQueryable<RoomTab>>().Setup(m => m.Provider).Returns(roomData.Provider);
			mockRoomSet.As<IQueryable<RoomTab>>().Setup(m => m.Expression).Returns(roomData.Expression);
			mockRoomSet.As<IQueryable<RoomTab>>().Setup(m => m.ElementType).Returns(roomData.ElementType);
			mockRoomSet.As<IQueryable<RoomTab>>().Setup(m => m.GetEnumerator()).Returns(roomData.GetEnumerator());

			_mockContext = new Mock<MeetingsApiContext>();
			_mockContext.Setup(c => c.RoomTabs).Returns(mockRoomSet.Object);

			_roomServices = new RoomServices(_mockContext.Object);
		}

		[TestMethod]
		public void GetRoombyId_ReturnsRoomDto_WhenRoomExists()
		{
			// Act
			var room = _roomServices.GetRoombyId(1);

			// Assert
			Assert.IsNotNull(room);
			Assert.AreEqual(1, room.RoomId);
			Assert.AreEqual("Room1", room.RoomName);
		}

		[TestMethod]
		[ExpectedException(typeof(System.Exception), "Room Doesn't Exist")]
		public void GetRoombyId_ThrowsException_When​RoomDoesNotExist()
		{
			//Act
			_roomServices.DeleteRoom(99);
		}
	}
}