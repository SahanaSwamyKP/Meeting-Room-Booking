import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { DateObj, FormatDate, JsonDataStore } from '../admin-page/slot-history/slot-history.component';
import { EmpTab } from '../../models/emp-tab';
import { SlotTab } from '../../models/slot-tab';
import { RoomTab } from '../../models/room-tab';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ActivatedRoute } from '@angular/router';


import { CommonModule, DatePipe } from '@angular/common';
const datepipe: DatePipe = new DatePipe('en-US')

@Component({
  selector: 'app-room-slots',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,CommonModule],
  templateUrl: './room-slots.component.html',
  styleUrl: './room-slots.component.css'
})
export class RoomSlotsComponent implements OnInit{
  constructor(private service:AppService,private route:ActivatedRoute){}
  
  cur_date: string = FormatDate.getDate(new Date().toJSON());
  cur_time: string = FormatDate.getTime(new Date().toJSON());
  user = {} as EmpTab;
  room = {} as RoomTab;
  AllSlots: SlotTab[] = [];
  RoomSlots: SlotTab[] = [];
  AllEmp: EmpTab[]=[];

  async ngOnInit(): Promise<void> {
    const obj = localStorage.getItem("loginData");
    if(obj!=null) this.user = JSON.parse(obj);

    const roomId = Number(this.route.snapshot.paramMap.get('roomID'));
    (await this.service.GetRoomById(roomId)).subscribe((data) => {
      this.room = data;
    });

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
        if(element.roomId==roomId){
          element.room = this.room;
          this.RoomSlots.push(element);
        }
        (await this.service.GetAllEmp()).subscribe((res:any)=>{
          this.AllEmp = res;
          this.AllEmp.forEach(async emp=>{
            if(element.empId==emp.empId){
              element.emp = emp;
              if(element.emp?.available==false) element.active=false;
            }
          })
        });
      })
    })
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
    this.RoomSlots = []
    this.ngOnInit();
  }
}
