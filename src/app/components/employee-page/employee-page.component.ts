import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AppService } from '../../app.service';
import { EmpTab } from '../../models/emp-tab';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-employee-page',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule,FooterComponent,HeaderComponent],
  templateUrl: './employee-page.component.html',
  styleUrl: './employee-page.component.css'
})
export class EmployeePageComponent implements OnInit{
  data: EmpTab = {} as EmpTab;
  constructor(private service: AppService,private router:Router){}
  ngOnInit(): void {
    this.data=this.service.getData();
    if(this.data==null) this.router.navigateByUrl('');
  }

}
