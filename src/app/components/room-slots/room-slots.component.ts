import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { DateObj, FormatDate, JsonDataStore } from '../admin-page/slot-history/slot-history.component';
import { EmpTab } from '../../models/emp-tab';
import { SlotTab } from '../../models/slot-tab';
import { RoomTab } from '../../models/room-tab';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ActivatedRoute, Router } from '@angular/router';


import { CommonModule, DatePipe } from '@angular/common';
import { first, firstValueFrom } from 'rxjs';
import { ConfirmInfo } from '../../models/confirm-info';
import { Get15Min } from '../employee-page/my-bookings/my-bookings.component';
const datepipe: DatePipe = new DatePipe('en-US')


@Component({
  selector: 'app-room-slots',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,CommonModule],
  templateUrl: './room-slots.component.html',
  styleUrl: './room-slots.component.css'
})
export class RoomSlotsComponent implements OnInit{
  constructor(private service:AppService,private route:ActivatedRoute,private router:Router){}
  
  DispSlot = new Map<SlotTab,EmpTab>();
  cur_date: string = FormatDate.getDate(new Date().toJSON());
  cur_time: string = FormatDate.getTime(new Date().toJSON());
  user = {} as EmpTab;
  room = {} as RoomTab;
  AllSlots: SlotTab[]=[];
  AllEmp: EmpTab[]=[];
  
  async initializeData(){
    try{
      const roomId = Number(this.route.snapshot.paramMap.get('roomID'));
      const roomResponse = firstValueFrom(await this.service.GetRoomById(roomId))
      this.room = (await roomResponse);

      const slotsResponse = firstValueFrom(await this.service.GetAllSlots());
      this.AllSlots = (await slotsResponse).sort((a,b)=>(a.date>=b.date?a.date==b.date?a.sTime>=b.sTime?a.sTime==b.sTime?a.eTime>b.eTime?-1:1:-1:1:-1:1));
      const empsResponse = firstValueFrom(await this.service.GetAllEmp())
      this.AllEmp = (await empsResponse);

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
        this.AllEmp.forEach(async emp=>{
          if(slot.empId==emp.empId && slot.roomId==roomId){
            this.DispSlot.set(slot,emp);
          }
        })
      })
    }catch(error){
      console.error("Error initializing data",error);
    }
  }

  async ngOnInit(): Promise<void> {
    const obj = localStorage.getItem("loginData");
    if(obj!=null) this.user = JSON.parse(obj);
    if(this.user==null) this.router.navigateByUrl('');
    this.initializeData();
    
    setInterval(() => {
      this.setCurDateTime()
    }, 1000);
  }

  AllconfirmData!: ConfirmInfo[];
  async setCurDateTime(){
    var DateTimeC = datepipe.transform(new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}),'dd-MM-YYYY HH:mm:ss')?.split(' ')
    if(DateTimeC) this.cur_date = DateTimeC[0];
    if(DateTimeC) this.cur_time = DateTimeC[1];
    this.AllSlots.forEach(element => {
      if(element.active && this.cur_date >= element.date && element.eTime <= this.cur_time){
        this.OnDelete(element);
      }
      if(element.active && this.cur_date == element.date && Get15Min.adding15min(element.sTime) <= this.cur_time){
        this.AllconfirmData.forEach(confirmData => {
          if(confirmData.confirm==false && confirmData.slotId==element.slotId){
            this.OnDelete(element);
          }
        });
      }
    })
  }
  async OnDelete(element: SlotTab) {
    element.active=false;
    element.sTime = JsonDataStore[element.slotId].JsonSTime;
    element.date = JsonDataStore[element.slotId].JsonDate;
    element.eTime = JsonDataStore[element.slotId].JsonETime;
    (await this.service.DeleteSlot(element)).subscribe();
    this.DispSlot.clear();
    this.ngOnInit();
  }
}
