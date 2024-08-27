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
import { firstValueFrom } from 'rxjs';
import { error } from 'jquery';
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
  DispSlots = new Map<SlotTab,RoomTab>();

  async initializeData(){
    try{
      const slotsResponse = firstValueFrom(await this.service.GetAllSlots())
      this.AllSlots = (await slotsResponse).sort((a,b)=>(a.date>=b.date?a.date==b.date?a.sTime>=b.sTime?a.sTime==b.sTime?a.eTime>b.eTime?-1:1:-1:1:-1:1));
      
      const roomsResponse = firstValueFrom(await this.service.GetAllRoom())
      this.AllRooms = (await roomsResponse);

      this.AllSlots.forEach(async slot => {
        const JsonVals : DateObj = {
          JsonDate: slot.date,
          JsonSTime: slot.sTime,
          JsonETime: slot.eTime
        }
        JsonDataStore[slot.slotId] = JsonVals;
        slot.date = await FormatDate.getDate(slot.date);
        slot.sTime = await FormatDate.getTime(slot.sTime);
        slot.eTime = await FormatDate.getTime(slot.eTime);
        this.AllRooms.forEach(async room=>{
          if(slot.roomId==room.roomId && slot.empId==this.user.empId){
            if(room.available==false) slot.active=false;
            this.DispSlots.set(slot,room);
          }
        })
      });

    }catch(error){
      console.error("Error initializing data",error)
    }
  }
  async ngOnInit(): Promise<void> {
    const obj = localStorage.getItem("loginData");
    if(obj!=null) this.user = JSON.parse(obj);
    this.initializeData();
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
