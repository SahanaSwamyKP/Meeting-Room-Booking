using MeetingsAPI.Data;
using MeetingsAPI.DTO;

namespace MeetingsAPI.Services
{
	public class SlotServices
	{
		private readonly ProjectContext _projectContext;

		public SlotServices(ProjectContext projectContext)
		{
			_projectContext = projectContext;
		}
		public List<SlotDto> GetSlotsByRoom(RoomDto room)
		{
			List<SlotDto> slotsdto = new List<SlotDto>();
			var slots=_projectContext.SlotTabs.ToList();
			foreach (var slot in slots) {
				if (slot.RoomId == room.RoomId)
				{
					SlotDto slotDto = new SlotDto();
					slotDto.SlotMap(slot);
					if(!slotsdto.Contains(slotDto)) slotsdto.Add(slotDto);
				}
			}
			return slotsdto;
		}

		public List<SlotDto> GetSlots()
		{
			List<SlotDto> slotsDto = new List<SlotDto>();
			var slots = _projectContext.SlotTabs.ToList();
			foreach (var slot in slots)
			{
				SlotDto slotDto = new SlotDto();
				slotDto.SlotMap(slot);
				slotsDto.Add(slotDto);
			}
			slotsDto.Sort();
			return slotsDto;
		}

		public void delete(SlotDto slotDto)
		{
			var slot = _projectContext.SlotTabs.FirstOrDefault(x=>x.SlotId == slotDto.SlotId);
			if(slot!=null) slot.Active = false;
			_projectContext.SaveChanges();
		}

		public void AddSlot(SlotDto slotDto)
		{

			if (slotDto == null) throw new Exception("Empty Slot Error");
			var slot = _projectContext.SlotTabs.FirstOrDefault(x => x.Date == DateOnly.FromDateTime(slotDto.Date) && x.RoomId == slotDto.RoomId && (TimeOnly.FromDateTime(slotDto.STime) >= x.STime && TimeOnly.FromDateTime(slotDto.STime) <= x.ETime));
			if (slot != null) throw new Exception("Slot in this room is already booked");

			SlotTab new_slot = new();
			new_slot.SlotMap(slotDto);
			_projectContext.SlotTabs.Add(new_slot);
			_projectContext.SaveChanges();
		}

		public void GetUnavailable(SlotDto slotDto)
		{
			if (slotDto.Date < DateTime.Now) throw new Exception("Past Date or Time Error");
			if (slotDto.STime > slotDto.ETime) throw new Exception("Start time should be less than end time");
			if (slotDto.ETime - slotDto.STime < TimeSpan.FromMinutes(30)) throw new Exception("Atleast 30 mins slot should be booked");
		}

	}
}
