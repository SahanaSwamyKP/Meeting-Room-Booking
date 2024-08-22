import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppService } from '../../app.service';
import { EmpTab } from '../../models/emp-tab';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  constructor(private service:AppService,private router:Router){}
  data: EmpTab = {} as EmpTab
  ngOnInit(): void {
    this.data=this.service.getData();
    if(this.data==null) this.router.navigateByUrl('');
  }
  

}