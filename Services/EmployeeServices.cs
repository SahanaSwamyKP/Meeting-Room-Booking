using System.Text;
using MeetingsAPI.Data;
using MeetingsAPI.DTO;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace MeetingsAPI.Services
{
	public interface IEmployeeServices
	{
		void AddEmployee(EmpDto emp);
		EmpDto GetEmpbyId(EmpDto emp);
		EmpDto GetEmpbyEmail(EmpDto emp);
		List<EmpDto> GetEmployees();
		void UpdateEmployee(EmpDto emp);
		void UpdatePassword(EmpDto emp);
		EmpDto? GetEmailForChange(EmpDto emp);
		void UpdateEmployeeById(int id, EmpDto emp);
	}

	public class EmployeeServices : IEmployeeServices
	{
		private readonly ProjectContext _projectContext;
		public EmployeeServices(ProjectContext projectContext) { this.empDId = null; this.empDE = null; this._projectContext = projectContext; }

		public List<EmpDto> GetEmployees()
		{
			var emplist = _projectContext.EmpTabs.ToList();
			var empDtolist = new List<EmpDto>();
			foreach (var emp in emplist)
			{
				EmpDto empDto = new EmpDto();
				empDto.EmpMap(emp);
				empDtolist.Add(empDto);
			}
			return empDtolist;
		}

		EmpTab? empDId;
		public EmpDto GetEmpbyId(EmpDto emp)
		{
			this.empDId = _projectContext.EmpTabs.FirstOrDefault(x => x.EmpId == emp.EmpId);
			if (empDId == null) throw new Exception("Employee Doesn't Exist");

			var empDto = new EmpDto();
			empDto.EmpMap(this.empDId);
			return empDto;
		}

		//Required for Login
		EmpTab? empDE;
		public EmpDto? GetEmpbyEmail(EmpDto emp)
		{
			empDE = _projectContext.EmpTabs.FirstOrDefault(x => x.EmpEmail == emp.EmpEmail);
			if (empDE == null) return null;
			if (empDE.Available == false) return null;
			byte[] salt = Encoding.UTF8.GetBytes(emp.EmpEmail);
			string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
				password: emp.EmpPassword!,
				salt: salt,
				prf: KeyDerivationPrf.HMACSHA512,
				iterationCount: 100000,
				numBytesRequested: 512 / 8)
				);
			emp.EmpPassword = hashed;
			if (empDE.EmpPassword != emp.EmpPassword) throw new Exception("Incorrect password");
			var empDto = new EmpDto();
			empDto.EmpMap(empDE);
			return empDto;
		}

		public EmpDto? GetEmailForChange(EmpDto emp)
		{
			empDE = _projectContext.EmpTabs.FirstOrDefault(x => x.EmpEmail == emp.EmpEmail);
			if (empDE == null) return null;
			var empDto = new EmpDto();
			empDto.EmpMap(empDE);
			return empDto;
		}

		public void AddEmployee(EmpDto emp)
		{
			if (emp == null) throw new Exception("Employee Cannot be NULL");
			if (emp.EmpRole != "Admin" && emp.EmpRole != "Employee") throw new Exception("Employee Role Doesn't Exist");

			var employee = GetEmailForChange(emp);
			if (employee != null) throw new Exception("Employee With This Email Already Exist");


			//hashing... 
			byte[] salt = Encoding.UTF8.GetBytes(emp.EmpEmail);
			string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
				password: emp.EmpPassword!,
				salt: salt,
				prf: KeyDerivationPrf.HMACSHA512,
				iterationCount: 100000,
				numBytesRequested: 512 / 8)
				);
			//
			emp.EmpPassword = hashed;

			var empTab = new EmpTab();
			empTab.EmpMap(emp);
			_projectContext.EmpTabs.Add(empTab);
			_projectContext.SaveChanges();
		}

		public void UpdatePassword(EmpDto emp)
		{
			var rec = GetEmailForChange(emp);
			if (rec == null) throw new Exception("Employee Doesn't Exist to Update Password");
			//hashing...
			byte[] salt = Encoding.UTF8.GetBytes(emp.EmpEmail);
			string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
				password: emp.EmpPassword!,
				salt: salt,
				prf: KeyDerivationPrf.HMACSHA512,
				iterationCount: 100000,
				numBytesRequested: 512 / 8)
				);
			//
			rec.EmpPassword = hashed;
			if (empDE == null) throw new Exception("Employee Doesn't Exist To Update Password");

			empDE.EmpMap(rec);
			_projectContext.SaveChanges();
		}

		public void UpdateEmployee(EmpDto emp)
		{
			EmpDto employee;
			try
			{
				employee = GetEmpbyId(emp);
			}
			catch (Exception)
			{
				throw;
			}

			employee.EmpName = emp.EmpName;
			employee.Available = emp.Available;
			employee.EmpRole = emp.EmpRole;

			employee.EmpEmail = emp.EmpEmail;
			//hashing...
			byte[] salt = Encoding.UTF8.GetBytes(emp.EmpEmail);
			string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
				password: emp.EmpPassword!,
				salt: salt,
				prf: KeyDerivationPrf.HMACSHA512,
				iterationCount: 100000,
				numBytesRequested: 512 / 8)
				);
			//
			employee.EmpPassword = hashed;

			if (empDId == null) throw new Exception("Employee Doesn't Exist To Update");

			empDId.EmpMap(employee);
			_projectContext.SaveChanges();
		}

		public void UpdateEmployeeById(int id, EmpDto emp)
		{
			var employee = _projectContext.EmpTabs.FirstOrDefault(e => e.EmpId == id) ?? throw new Exception();
			employee.EmpName = emp.EmpName;
			employee.EmpEmail = emp.EmpEmail;
			employee.EmpRole = emp.EmpRole;
			employee.Available = emp.Available;
			employee.EmpMap(emp);
			_projectContext.SaveChanges();
		}
	}
}