import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmpTab } from '../../models/emp-tab';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { SlotTab } from '../../models/slot-tab';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../../auth.service';
import { JwtInterceptor } from '../../jwt.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule,FooterComponent,CommonModule],
  // providers: [
  //   provideHttpClient(withInterceptors([JwtInterceptor]))
  // ],
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
    available: false
  };
  constructor(private router: Router, private service: AppService,private authService: AuthService){}
  ngOnInit(): void {
    localStorage.clear();
  }

  Test(email: string): boolean{
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com)$/;  // Ensures the email ends with .com
    return emailRegex.test(email);
  }
  async OnSubmit() {
    var error = document.getElementById('error');
    if(!this.Test(this.emp.empEmail)){
      if(error) error.innerText = "Enter valid email";
      return;
    }

    (await (this.authService.getJwtToken(this.emp))).subscribe(async (res: any)=>{
      var data = await this.service.GetEmpByEmail(this.emp);
      data.subscribe((res:any)=>{
        if(res=='Incorrect password' || res=='Email not found! Contact Admin'){
          if(error) error.innerText = res;
        }
        localStorage.setItem("loginData",JSON.stringify(res));
        if(res.empRole=='Admin'){
          this.router.navigateByUrl('/admin-page');
        }
        if(res.empRole=='Employee'){
          this.router.navigateByUrl('/employee-page');
        }
      });
      
    });
  }
}
