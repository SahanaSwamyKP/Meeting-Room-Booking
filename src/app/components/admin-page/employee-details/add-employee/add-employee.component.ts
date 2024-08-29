import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EmployeeDetailsComponent } from '../employee-details.component';
import { FooterComponent } from '../../../footer/footer.component';
import { HeaderComponent } from '../../../header/header.component';
import { EmpTab } from '../../../../models/emp-tab';
import { AppService } from '../../../../app.service';
import { EmailTest } from '../../../login-page/login-page.component';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule,EmployeeDetailsComponent,FooterComponent,HeaderComponent],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit{
  employee: EmpTab = {
    empName: '',
 
    empEmail: '',
 
    empPassword: '',
 
    available: true,
 
    empRole: '',
    empId: 0
  };
 
  constructor(private service: AppService, private router: Router) {}
  ngOnInit(): void {
    if(localStorage.getItem("loginData")==null) this.router.navigateByUrl('');
  }
 
  async onSubmit() {
    if(!EmailTest.Test(this.employee.empEmail)){
      alert("Enter Correct Format Email");
    }else{
      (await this.service.AddEmployee(this.employee)).subscribe((res) => {
        alert(res);
      });
    }
  }
}
