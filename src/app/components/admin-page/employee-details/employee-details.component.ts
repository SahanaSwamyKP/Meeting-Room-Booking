import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppService } from '../../../app.service';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { EmpTab } from '../../../models/emp-tab';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [RouterModule,CommonModule,HeaderComponent,FooterComponent,FormsModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit{
  employees: EmpTab[] = [];

  constructor(private service: AppService,private router: Router) {}

  ngOnInit(): void {
    if(localStorage.getItem('loginData')==null)  this.router.navigateByUrl('');
    this.fetchEmployees();
  }

  searchTerm: string="";
  filteredEmployees!: EmpTab[];
  applyFilter(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredEmployees = this.employees.filter(employee =>
      employee.empName.toLowerCase().includes(term) ||
      employee.empRole.toLowerCase().includes(term)
    );
  }
  // Fetch employees from the service
  async fetchEmployees(): Promise<void> {
    (await this.service.GetAllEmp()).subscribe((data: EmpTab[])=>{
      this.employees = data;
      this.filteredEmployees=this.employees;
    })
  }
}