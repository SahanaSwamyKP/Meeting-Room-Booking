import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { AppService } from '../../../app.service';
import { SlotTab } from '../../../models/slot-tab';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmpTab } from '../../../models/emp-tab';
import { DatePipe } from '@angular/common';
import { RoomTab } from '../../../models/room-tab';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmInfo } from '../../../models/confirm-info';
import { Get15Min } from '../../employee-page/my-bookings/my-bookings.component';
const datepipe: DatePipe = new DatePipe('en-US')

export class FormatDate{
  static getDate(date: any){
    var [year,month,day] = date.substring(0,10).split('-');
    return day+"-"+month+"-"+year;
  }

  static getTime(date: any){
    return date.substring(11,19);
  }
}
export type DateObj = {JsonDate : string,JsonSTime: string,JsonETime: string};
export type MapType = {[id: number]: DateObj};
export const JsonDataStore : MapType = {};


@Component({
  selector: 'app-slot-history',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,FormsModule,CommonModule],
  templateUrl: './slot-history.component.html',
  styleUrl: './slot-history.component.css'
})
export class SlotHistoryComponent implements OnInit{
  constructor(private service:AppService,private router:Router){}
  
  AllSlots = [] as SlotTab[];
  AllEmp = [] as EmpTab[];
  AllRooms = [] as RoomTab[];
  emp!: EmpTab;
  cur_date!: string;
  cur_time!: string;
  DispSlot = new Map<SlotTab,[EmpTab: EmpTab,RoomTab: RoomTab]>()
  AllconfirmData!: ConfirmInfo[];
  setCurDateTime(){
    var DateTimeC = datepipe.transform(new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}),'dd-MM-YYYY HH:mm:ss')?.split(' ')
    if(DateTimeC) this.cur_date = DateTimeC[0];
    if(DateTimeC) this.cur_time = DateTimeC[1];

    this.AllSlots.forEach(element => {
      if(element.active){
        if(this.cur_date > element.date) this.OnDelete(element);
        if(this.cur_date >= element.date && element.eTime <= this.cur_time) this.OnDelete(element);
      }if(element.active && this.cur_date == element.date && Get15Min.adding15min(element.sTime) <= this.cur_time){
        this.AllconfirmData.forEach(confirmData => {
          if(confirmData.confirm==false && confirmData.slotId==element.slotId){
            this.OnDelete(element);
          }
        });
      }
    })
  }

  async initializeData() {
    try {
      
      const confirmResponse = firstValueFrom(await this.service.GetAllInfo());
      this.AllconfirmData = (await confirmResponse);

      const slotsResponse = firstValueFrom(await this.service.GetAllSlots());
      this.AllSlots = (await slotsResponse).sort((a:SlotTab, b:SlotTab) => (
        a.date >= b.date ? (a.date == b.date ? (a.sTime >= b.sTime ? (a.sTime == b.sTime ? (a.eTime > b.eTime ? -1 : 1) : -1) : 1) : -1) : 1
      ));
      const roomsResponse = firstValueFrom(await this.service.GetAllRoom());
      this.AllRooms = (await roomsResponse);

      const empResponse = firstValueFrom(await this.service.GetAllEmp());
      this.AllEmp = (await empResponse);

      this.AllSlots.forEach(slts=>{
        const JsonVals : DateObj = {
          JsonDate: slts.date,
          JsonSTime: slts.sTime,
          JsonETime: slts.eTime
        }
        JsonDataStore[slts.slotId] = JsonVals;
        slts.date = FormatDate.getDate(slts.date);
        slts.sTime = FormatDate.getTime(slts.sTime);
        slts.eTime = FormatDate.getTime(slts.eTime);

        this.AllEmp.forEach(emps => {
          this.AllRooms.forEach((room:any)=>{
            if(slts.roomId==room.roomId && slts.empId==emps.empId){
              if(room.available==false || emps.available==false) slts.active=false;
              this.DispSlot.set(slts,[emps,room]);
            }
          })
        })
      })
    } catch (error) {
      console.error("Error initializing data:", error);
    }
  };

  async ngOnInit(): Promise<void> {
    const obj = localStorage.getItem("loginData");
    if(obj!=null) this.emp = JSON.parse(obj);
    if(this.emp==null) this.router.navigateByUrl('');
    this.AllEmp = [];
    this.AllRooms = [];
    this.AllSlots = [];
    this.initializeData();
    
    setInterval(() => {
      this.setCurDateTime()
    }, 1000);
  }
  
  async OnDelete(element: SlotTab){
    element.active=false;
    element.sTime = JsonDataStore[element.slotId].JsonSTime;
    element.date = JsonDataStore[element.slotId].JsonDate;
    element.eTime = JsonDataStore[element.slotId].JsonETime;
    (await this.service.DeleteSlot(element)).subscribe();
    this.DispSlot.clear();
    this.ngOnInit();
  }

}
