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
class EmpDateFormat{
  static getDate(date:string){
    const [year,month,day] = date.split('-');
    return day+'-'+month+'-'+year;
  }
  static getTime(time:String){
    return time+":00";
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
  AllRooms!: RoomTab[];
  AllSlots!: SlotTab[];
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
    (await this.service.GetAllRoom()).subscribe((roomsData: RoomTab[])=>{
      this.AllRooms=roomsData;
    });
    (await this.service.GetAllSlots()).subscribe((slotsData: SlotTab[])=>{
      this.AllSlots=slotsData;
    })
  }
  
  async onSearch(){
    this.slot.date=this.date+"T"+this.stime+":00.000Z";
    this.slot.sTime=this.date+"T"+this.stime+":00.000Z";
    this.slot.eTime=this.date+"T"+this.etime+":00.000Z";
    this.validRooms=[];
    this.invalidRooms=[];
    this.slot.emp=this.emp;
    
    (await this.service.GetSlotRoom(this.slot)).subscribe(async (res:any)=>{
      var spn = document.getElementById('error')
      if(res=="Towards SlotBooking"){
        if(spn!=null) spn.innerText="";
        this.AllRooms.forEach(room=>{
          this.AllSlots.forEach(async slotData => {
            if(room.capacity!=this.room.capacity)
            {
                this.invalidRooms.push(room);
            }
            else
            {
              var tempdate = EmpDateFormat.getDate(this.date);
              var tempstime = EmpDateFormat.getTime(this.stime);
              var tempetime = EmpDateFormat.getTime(this.etime);
              const JsonVals : DateObj = {
                JsonDate: slotData.date,
                JsonSTime: slotData.sTime,
                JsonETime: slotData.eTime
              }
              JsonDataStore[slotData.slotId] = JsonVals;
              slotData.date = FormatDate.getDate(slotData.date);
              slotData.sTime = await FormatDate.getTime(slotData.sTime);
              slotData.eTime = await FormatDate.getTime(slotData.eTime);
      
              if(slotData.roomId==room.roomId && slotData.active && slotData.date==tempdate && ((tempstime>=slotData.sTime && tempstime<slotData.eTime) || (tempetime>slotData.sTime && tempetime<=slotData.eTime) || (tempstime>=slotData.sTime && tempetime<=slotData.eTime) || (tempstime<=slotData.sTime && tempetime>=slotData.eTime))){
                
              }
              this.validRooms.push(room);
            }
          });
        });
        // this.AllRooms.forEach(room=>{
        //     this.validRooms.push(room);
        // })
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
      // this.slot.roomId=this.slot.room.roomId;
      // this.slot.empId=this.slot.emp.empId;
      console.log(this.slot);
      (await this.service.AddSlot(this.slot)).subscribe((res)=>{
        alert(res);
      });
      this.goToLink('http://localhost:4200/room-slots/'+this.room.roomId)
    });
    
  }
}
