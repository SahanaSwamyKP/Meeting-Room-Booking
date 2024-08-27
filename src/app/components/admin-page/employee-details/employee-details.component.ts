import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
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

  constructor(private service: AppService) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  // Fetch employees from the service
  async fetchEmployees(): Promise<void> {
    (await this.service.GetAllEmp()).subscribe((data: EmpTab[])=>{
      this.employees = data;
    })
  }
}