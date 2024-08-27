import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppService } from '../../app.service';
import { FormsModule } from '@angular/forms';
import { EmpTab } from '../../models/emp-tab';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [FormsModule,RouterModule,FooterComponent,HeaderComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent implements OnInit{
  constructor(private router: Router,private service: AppService){
  }
  emp!: EmpTab;
  ngOnInit(): void {
    const obj = localStorage.getItem("loginData");
    if(obj!=null) this.emp = JSON.parse(obj);
    if(this.emp==null) this.router.navigateByUrl('');
  }

}
