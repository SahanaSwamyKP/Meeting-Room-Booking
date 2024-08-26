import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RoomTab } from '../../../models/room-tab';
import { AppService } from '../../../app.service';
import { FooterComponent } from '../../footer/footer.component';
import { HeaderComponent } from '../../header/header.component';
import { EmpTab } from '../../../models/emp-tab';

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule,FooterComponent,HeaderComponent],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.css'
})
export class RoomDetailsComponent implements OnInit{
  rooms!: RoomTab[];
  emp!: EmpTab;
  constructor(private service: AppService,private route: Router) {}

  async ngOnInit(): Promise<void> {
    const obj = localStorage.getItem("loginData");
    if(obj!=null) this.emp = JSON.parse(obj);

    (await this.service.GetAllRoom()).subscribe((res: any)=>{
      this.rooms=res;
    })
  }

  deleteRoom(roomId:number):void{
    if(confirm("Are You Sure You Want to delete this room?"))
    {
      this.service.DeleteRoom(roomId).subscribe(()=>
      {
        this.rooms=this.rooms.filter(room=>room.roomId!==roomId);
      })
    }
    this.ngOnInit();
  }

}