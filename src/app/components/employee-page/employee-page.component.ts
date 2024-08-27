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
import { firstValueFrom } from 'rxjs';
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
  room!: RoomTab;
  capacity!: number;
  validRooms = new Set<RoomTab>();
  invalidRooms = new Set<RoomTab>();
  AllRooms!: RoomTab[];
  AllSlots!: SlotTab[];
  slot : SlotTab = {
    slotId: 0,
    roomId: 0,
    empId: 0,
    date: "",
    sTime: "",
    eTime: "",
    active: true
  }
  date!: string;
  stime!: string;
  etime!: string;
  
  constructor(private service: AppService,private router:Router){}
  
  async initializeData(){
    try{
      const roomsResponse = firstValueFrom(await this.service.GetAllRoom())
      this.AllRooms = (await roomsResponse);
      const slotsResponse = firstValueFrom(await this.service.GetAllSlots())
      this.AllSlots= (await slotsResponse);
    }catch(error){
      console.log(error);
    }
  }

  
  async ngOnInit(): Promise<void>{
    const obj = localStorage.getItem("loginData");
    if(obj!=null) this.emp = JSON.parse(obj);
    if(this.emp==null) this.router.navigateByUrl('');
    this.initializeData();
  }
  
  async onSearch(){
    var error = document.getElementById('error')
    this.slot.date=this.date+"T"+this.stime+":00.000Z";
    this.slot.sTime=this.date+"T"+this.stime+":00.000Z";
    this.slot.eTime=this.date+"T"+this.etime+":00.000Z";

    (await this.service.GetSlotRoom(this.slot)).subscribe(res=>{
      if(res=="Towards SlotBooking"){
        if(error) error.innerText = "";
        this.validRooms.clear()
        this.invalidRooms.clear()
        this.AllRooms.forEach((room)=>{
          if(room.capacity!=this.capacity){
            this.invalidRooms.add(room);
          }else{
            this.AllSlots.forEach((slotData)=>{
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
                slotData.sTime = FormatDate.getTime(slotData.sTime);
                slotData.eTime = FormatDate.getTime(slotData.eTime);
                if(slotData.roomId==room.roomId && slotData.active && slotData.date==tempdate && ((tempstime>=slotData.sTime && tempstime<slotData.eTime) || (tempetime>slotData.sTime && tempetime<=slotData.eTime) || (tempstime>=slotData.sTime && tempetime<=slotData.eTime) || (tempstime<=slotData.sTime && tempetime>=slotData.eTime))){
                  if(!this.invalidRooms.has(room)){
                    this.invalidRooms.add(room);
                  }
                }
            })
          }
        })
        this.AllRooms.forEach(room=>{
          if(!this.invalidRooms.has(room) && !this.invalidRooms.has(room)){
            this.validRooms.add(room);
          }
        })
      }else{
        if(error) error.innerText=res;
      }
    });

    
    this.ngOnInit();
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
      this.slot.roomId=this.room.roomId;
      this.slot.empId=this.emp.empId;
      (await this.service.AddSlot(this.slot)).subscribe((res)=>{
        alert(res);
      });
      this.goToLink('http://localhost:4200/room-slots/'+this.room.roomId)
    });
    
  }
}
