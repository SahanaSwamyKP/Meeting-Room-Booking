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

		public void AddSlot(SlotDto slotDto)
		{

			if (slotDto == null) throw new Exception("Empty Slot Error");
			var slot = _projectContext.SlotTabs.FirstOrDefault(x => x.Date == slotDto.Date && x.RoomId == slotDto.RoomId && (slotDto.STime >= x.STime && slotDto.STime <= x.ETime));
			if (slot != null) throw new Exception("Slot in this room is already booked");

			SlotTab new_slot = new();
			new_slot.SlotMap(slotDto);
			_projectContext.SlotTabs.Add(new_slot);
			_projectContext.SaveChanges();
		}

	}
}
