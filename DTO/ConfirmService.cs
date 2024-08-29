using ConfirmAPI.Data;
using ConfirmAPI.DTO;

namespace ConfirmAPI.Services
{
	public interface IConfirmService
	{
		void AddInfo(ConfirmInfoDto Info);
		List<ConfirmInfoDto> GetAll();
		void UpdateConfirm(ConfirmInfoDto Info);
	}

	public class ConfirmService : IConfirmService
	{
		private readonly ConfirmContext _context;
		public ConfirmService(ConfirmContext _context) { this._context = _context; }

		public List<ConfirmInfoDto> GetAll()
		{
			List<ConfirmInfoDto> confirmInfoDtos = new List<ConfirmInfoDto>();
			var result = _context.ConfirmInfos.ToList();
			foreach (var info in result)
			{
				ConfirmInfoDto dto = new ConfirmInfoDto();
				dto.MapData(info);
				confirmInfoDtos.Add(dto);
			}
			return confirmInfoDtos;
		}

		public void AddInfo(ConfirmInfoDto Info)
		{
			ConfirmInfo confirmInfo = new ConfirmInfo();
			confirmInfo.MapData(Info);
			_context.ConfirmInfos.Add(confirmInfo);
			_context.SaveChanges();
		}

		public void UpdateConfirm(ConfirmInfoDto Info)
		{
			var confirmInfo = _context.ConfirmInfos.FirstOrDefault(x => x.ConfirmId == Info.ConfirmId);
			if (confirmInfo == null) throw new Exception("Info Doesn't Exist");

			confirmInfo.Confirm = Info.Confirm;
			_context.SaveChanges();
		}
	}
}
