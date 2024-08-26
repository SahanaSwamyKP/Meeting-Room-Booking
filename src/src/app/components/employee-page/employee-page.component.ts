import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AppService } from '../../app.service';
import { EmpTab } from '../../models/emp-tab';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { SlotTab } from '../../models/slot-tab';
import { RoomTab } from '../../models/room-tab';
import { DateObj, FormatDate, JsonDataStore } from '../admin-page/slot-history/slot-history.component';

let checkedRooms = new Set<RoomTab>();
class EmpDateFormat{
  static getDate(date:string){
    const [year,month,day] = date.split('-');
    return day+'-'+month+'-'+year;
  }
  static getTime(time:String){
    return time+":00"
  }
}

@Component({
  selector: 'app-employee-page',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule,FooterComponent,HeaderComponent],
  templateUrl: './employee-page.component.html',
  styleUrl: './employee-page.component.css'
})
export class EmployeePageComponent implements OnInit{
  emp!: EmpTab;
  room: RoomTab = {} as RoomTab;
  validRooms: RoomTab[] = [];
  invalidRooms: RoomTab[]= [];

  slot : SlotTab = {
    slotId: 0,
    roomId: 0,
    empId: 0,
    date: "",
    sTime: "",
    eTime: "",
    active: true,
    emp: null,
    room: null
  }

  constructor(private service: AppService,private router:Router){}

  date!: string;
  stime!: string;
  etime!: string;
  
  async ngOnInit(): Promise<void>{
    const obj = localStorage.getItem("loginData");
    if(obj!=null) this.emp = JSON.parse(obj);
    if(this.emp==null) this.router.navigateByUrl('');
    
  }
  
  async onSearch(){
    this.slot.date=this.date+"T"+this.stime+":00.000Z";
    this.slot.sTime=this.date+"T"+this.stime+":00.000Z";
    this.slot.eTime=this.date+"T"+this.etime+":00.000Z";
    this.validRooms=[];
    this.invalidRooms=[];
    this.slot.emp=this.emp;
    var tempdate = EmpDateFormat.getDate(this.date);
    var tempstime = EmpDateFormat.getTime(this.stime);
    var tempetime = EmpDateFormat.getTime(this.etime);
    checkedRooms.clear(); 
    
    (await this.service.GetSlotRoom(this.slot)).subscribe(async (res:any)=>{
      var spn = document.getElementById('error')
      if(res=="Towards SlotBooking"){
        if(spn!=null) spn.innerText="";
        (await this.service.GetAllRoom()).subscribe((roomsData: RoomTab[])=>{
          roomsData.forEach(async (roomVal: RoomTab)=>{

            if(roomVal.capacity!=this.room.capacity){
              if(!checkedRooms.has(roomVal)){
                checkedRooms.add(roomVal);
                this.invalidRooms.push(roomVal);
              }
            }else{
              (await this.service.GetSlotsByRoom(roomVal)).subscribe((slots: SlotTab[])=>{
                slots.forEach(async (slot: SlotTab)=> {
                  const JsonVals : DateObj = {
                    JsonDate: slot.date,
                    JsonSTime: slot.sTime,
                    JsonETime: slot.eTime
                  }
                  JsonDataStore[slot.slotId] = JsonVals;
                  slot.date = await FormatDate.getDate(slot.date);
                  slot.sTime = await FormatDate.getTime(slot.sTime);
                  slot.eTime = await FormatDate.getTime(slot.eTime);

                  if(slot.active && slot.date==tempdate && ((tempstime>=slot.sTime && tempstime<slot.eTime) || (tempetime>slot.sTime && tempetime<=slot.eTime) || (tempstime>=slot.sTime && tempetime<=slot.eTime) || (tempstime<=slot.sTime && tempetime>=slot.eTime))){
                    if(!checkedRooms.has(roomVal)){
                      this.invalidRooms.push(roomVal);
                      checkedRooms.add(roomVal);
                    }
                  }
                });
              });
              if(!checkedRooms.has(roomVal)){
                this.validRooms.push(roomVal);
                checkedRooms.add(roomVal);
              }
            }
          });
        });
      }
      else
      {
        if(spn!=null) spn.innerText=res;
      }
    });

  }

  goToLink(url:string){
    window.open(url)
  }

  async BookSlot(roomID: number){
    (await this.service.GetRoomById(roomID)).subscribe(async (data: RoomTab)=>{
      this.room=data;
      this.slot.date=this.date+"T"+this.stime+":00.000Z";
      this.slot.sTime=this.date+"T"+this.stime+":00.000Z";
      this.slot.eTime=this.date+"T"+this.etime+":00.000Z";
      this.slot.room=this.room;
      this.slot.emp=this.emp;
      (await this.service.AddSlot(this.slot)).subscribe((res)=>{
        alert(res);
      });
      this.goToLink('http://localhost:4200/room-slots/'+this.room.roomId)
    });
    
  }
}
