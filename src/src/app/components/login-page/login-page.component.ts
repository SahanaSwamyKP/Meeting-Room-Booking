import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmpTab } from '../../models/emp-tab';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { SlotTab } from '../../models/slot-tab';
import { FooterComponent } from '../footer/footer.component';
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule,FooterComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit{
  emp: EmpTab = {
    empId: 0,
    empName: '',
    empRole: '',
    empEmail: '',
    empPassword: '',
    available: false,
    slotTabs: [] as SlotTab[]
  };
  constructor(private router: Router, private service: AppService){}
  ngOnInit(): void {
    localStorage.clear();
  }

  Test(email: string): boolean{
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com)$/;  // Ensures the email ends with .com
    return emailRegex.test(email);
  }
  async OnSubmit() {
    if(!this.Test(this.emp.empEmail)){
      var error = document.getElementById('error');
      if(error==null) return; 
      error.innerText = "Enter valid email";
      return;
    }
    var data = await this.service.GetEmpByEmail(this.emp);
    data.subscribe((res:any)=>{
      if(res=='Incorrect password' || res=='Email not found! Contact Admin'){
        var error = document.getElementById('error');
        if(error==null) return; 
        error.innerText = res;
      }
      localStorage.setItem("loginData",JSON.stringify(res));
      if(res.empRole=='Admin'){
        this.router.navigateByUrl('/admin-page');
      }
      if(res.empRole=='Employee'){
        this.router.navigateByUrl('/employee-page');
      }
    })
  }
}
