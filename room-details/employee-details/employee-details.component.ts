import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../employee.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EmpTab } from '../../models/emp-tab';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [RouterModule,CommonModule,HttpClientModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit{
  employees: EmpTab[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  // Fetch employees from the service
  fetchEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data: EmpTab[]) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error fetching employee data', error);
      }
    );
  }

}
