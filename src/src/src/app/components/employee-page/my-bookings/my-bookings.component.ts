import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { SlotTab } from '../../../models/slot-tab';
import { EmpTab } from '../../../models/emp-tab';
import { RoomTab } from '../../../models/room-tab';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormatDate } from '../../admin-page/slot-history/slot-history.component';
import { DateObj } from '../../admin-page/slot-history/slot-history.component';
import { JsonDataStore } from '../../admin-page/slot-history/slot-history.component';

import { DatePipe } from '@angular/common';
const datepipe: DatePipe = new DatePipe('en-US')

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,FormsModule,CommonModule],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent implements OnInit{
  constructor(private service:AppService){}
  
  cur_date: string = FormatDate.getDate(new Date().toJSON());
  cur_time: string = FormatDate.getTime(new Date().toJSON());
  user = {} as EmpTab;
  AllSlots: SlotTab[] = [];
  EmpSlots: SlotTab[] = [];
  AllRooms: RoomTab[] = [];
  async ngOnInit(): Promise<void> {
    const obj = localStorage.getItem("loginData");
    if(obj!=null) this.user = JSON.parse(obj);
    (await this.service.GetAllSlots()).subscribe((res: SlotTab[])=>{
      this.AllSlots = res.sort((a,b)=>(a.date>=b.date?a.date==b.date?a.sTime>=b.sTime?a.sTime==b.sTime?a.eTime>b.eTime?-1:1:-1:1:-1:1));
      
      this.AllSlots.forEach(async element => {
        const JsonVals : DateObj = {
          JsonDate: element.date,
          JsonSTime: element.sTime,
          JsonETime: element.eTime
        }
        JsonDataStore[element.slotId] = JsonVals;
        element.date = await FormatDate.getDate(element.date);
        element.sTime = await FormatDate.getTime(element.sTime);
        element.eTime = await FormatDate.getTime(element.eTime);
        if(element.empId==this.user.empId){
          element.emp = this.user;
          this.EmpSlots.push(element);
        }
        (await this.service.GetAllRoom()).subscribe((res:any)=>{
          this.AllRooms = res;
          this.AllRooms.forEach(async room=>{
            if(element.roomId==room.roomId){
              element.room = room;
              if(element.room?.available==false) element.active=false;
            }
          })
        });
      })
    });
    
    setInterval(() => {
      this.setCurDateTime()
    }, 1000);
  }
  
  async setCurDateTime(){
    var DateTimeC = datepipe.transform(new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}),'dd-MM-YYYY HH:mm:ss')?.split(' ')
    if(DateTimeC) this.cur_date = DateTimeC[0];
    if(DateTimeC) this.cur_time = DateTimeC[1];
    this.AllSlots.forEach(element => {
      if(element.active && this.cur_date >= element.date && element.eTime <= this.cur_time){
        this.OnDelete(element.slotId);
      }
    })
  } 
  
  async OnDelete(slotId: number) {
    this.AllSlots.forEach(async element => {
      if(element.slotId==slotId && element.active==true){
        element.active=false;
        element.sTime = JsonDataStore[element.slotId].JsonSTime;
        element.date = JsonDataStore[element.slotId].JsonDate;
        element.eTime = JsonDataStore[element.slotId].JsonETime;
        var data = await this.service.DeleteSlot(element);
        data.subscribe((res:any)=>{
          console.log(res);
        })
      }
    });
    this.EmpSlots = []
    this.ngOnInit();
  }

}
