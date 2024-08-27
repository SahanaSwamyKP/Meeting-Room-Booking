import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { AppService } from '../../../app.service';
import { SlotTab } from '../../../models/slot-tab';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmpTab } from '../../../models/emp-tab';
import { DatePipe } from '@angular/common';
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
  constructor(private service:AppService){}
  
  AllSlots = [] as SlotTab[];
  AllEmp = [] as EmpTab[];
  emp!: EmpTab;
  cur_date!: string;
  cur_time!: string;

  setCurDateTime(){
    var DateTimeC = datepipe.transform(new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}),'dd-MM-YYYY HH:mm:ss')?.split(' ')
    if(DateTimeC) this.cur_date = DateTimeC[0];
    if(DateTimeC) this.cur_time = DateTimeC[1];

    this.AllSlots.forEach(element => {
      if(element.active && this.cur_date >= element.date && element.eTime <= this.cur_time){
        this.OnDelete(element.slotId);
      }
    })
  } 
  async ngOnInit(): Promise<void> {
    const obj = localStorage.getItem("loginData");
    if(obj!=null) this.emp = JSON.parse(obj);
    (await this.service.GetAllSlots()).subscribe(async(res: SlotTab[])=>{
      this.AllSlots = res.sort((a,b)=>(a.date>=b.date?a.date==b.date?a.sTime>=b.sTime?a.sTime==b.sTime?a.eTime>b.eTime?-1:1:-1:1:-1:1));
      this.AllSlots.forEach(async slts=>{
        const JsonVals : DateObj = {
          JsonDate: slts.date,
          JsonSTime: slts.sTime,
          JsonETime: slts.eTime
        }
        JsonDataStore[slts.slotId] = JsonVals;
        slts.date = FormatDate.getDate(slts.date);
        slts.sTime = FormatDate.getTime(slts.sTime);
        slts.eTime = FormatDate.getTime(slts.eTime);
        (await this.service.GetAllEmp()).subscribe(res=>{
          this.AllEmp = res;
          this.AllEmp.forEach(emps => {
            if(slts.empId==emps.empId){
              slts.emp = emps;
            }
          })
        });
        (await this.service.GetAllRoom()).subscribe(res=>{
          res.forEach((rooms:any)=>{
            if(slts.roomId==rooms.roomId){
              slts.room=rooms;
              if(slts.room?.available==false) slts.active=false;
            }
          })
        })
      })
    });
    setInterval(() => {
      this.setCurDateTime()
    }, 1000);
  }
  
  async OnDelete(slotID: Number){
    this.AllSlots.forEach(async element => {
      if(element.slotId==slotID && element.active==true){
        element.active=false;
        element.sTime = JsonDataStore[element.slotId].JsonSTime;
        element.date = JsonDataStore[element.slotId].JsonDate;
        element.eTime = JsonDataStore[element.slotId].JsonETime;
        (await this.service.DeleteSlot(element)).subscribe();
      }
    });
    this.ngOnInit();
  }

}
