import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from '../../footer/footer.component';
import { HeaderComponent } from '../../header/header.component';
import { FormsModule,} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmpTab } from '../../../models/emp-tab';
import { AppService } from '../../../app.service';
 
@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [RouterModule, FooterComponent, HeaderComponent, FormsModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  emp!: EmpTab;
 
  constructor(private service: AppService, private router: Router) {
    const obj = localStorage.getItem("loginData");
    if(obj!=null) this.emp = JSON.parse(obj);
  }

  password!: string;
  confirmPass!: string;
  onSubmit() {
      const newPassword = this.password;
      const confirmPassword = this.confirmPass;

      if (newPassword === confirmPassword) {
        this.emp.empPassword = newPassword;
        this.service.ChangePassword(this.emp).subscribe((res)=>{
          console.log(res);
          this.router.navigateByUrl('')
        });
      }else {
        alert("New Password and Confirm Password do not match!");
      }
  }
}
 