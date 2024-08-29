import { Component, OnInit } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RoomDetailsComponent } from '../room-details.component';
import { HeaderComponent } from '../../../header/header.component';
import { FooterComponent } from '../../../footer/footer.component';
import { RoomTab } from '../../../../models/room-tab';
import { AppService } from '../../../../app.service';
import { EmpTab } from '../../../../models/emp-tab';
 
@Component({
  selector: 'app-add-room',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule,RoomDetailsComponent,HeaderComponent,FooterComponent],
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.css'
})
export class AddRoomComponent implements OnInit{
  room:RoomTab = {
    roomId: 0,
    roomName: '',
    capacity: 0,
    available: false
  };
  status!: string;
  constructor(private service:AppService,private router:Router){}
  emp! : EmpTab;
  ngOnInit(): void {
    const obj = localStorage.getItem("loginData");
    if(obj!=null) this.emp = JSON.parse(obj);
    if(this.emp==null) this.router.navigateByUrl('');
  }
  async onSubmit()
  {
    if(this.status=="true"){
      this.room.available=true;
    }else{
      this.room.available=false;
    }
    
    (await this.service.AddRoom(this.room)).subscribe((res)=>
    {
      alert(res);
    });
  }
 
}