import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../../employee.service';
import { EmpTab } from '../../../models/emp-tab';
import { EmployeeDetailsComponent } from '../employee-details.component';
import { FooterComponent } from '../../footer/footer.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule,EmployeeDetailsComponent,FooterComponent,HeaderComponent],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  employee: EmpTab = {
    empName: '',
 
    empEmail: '',
 
    empPassword: '',
 
    available: true,
 
    empRole: '',
    empId: 0,
    slotTabs: []
  };
 
  constructor(private employeeService: EmployeeService, private router: Router) {}
 
  onSubmit() {
    this.employeeService.addEmployee(this.employee).subscribe(() => {
      alert("Employee Added Successfully");
      this.router.navigateByUrl('/employee-details'); // Redirect to the employee list page after saving
 
    });
 
  }
}

