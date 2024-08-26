import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EmployeeDetailsComponent } from '../employee-details.component';
import { FooterComponent } from '../../../footer/footer.component';
import { HeaderComponent } from '../../../header/header.component';
import { EmpTab } from '../../../../models/emp-tab';
import { AppService } from '../../../../app.service';

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
 
  constructor(private service: AppService, private router: Router) {}
 
  async onSubmit() {
    (await this.service.AddEmployee(this.employee)).subscribe(() => {
      alert("Employee Added Successfully");
    });
 
  }
}
