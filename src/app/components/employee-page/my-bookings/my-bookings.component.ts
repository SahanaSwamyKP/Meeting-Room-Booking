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
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmInfo } from '../../../models/confirm-info';
const datepipe: DatePipe = new DatePipe('en-US')

export class Get15Min{
  static adding15min(start_time:string):string{
    const [hours, minutes, seconds] = start_time.split(':').map(Number);
  
    let totalSeconds = hours * 3600 + minutes * 60 + seconds;
    // Add 15 minutes (900 seconds)
    totalSeconds += 900;
    // Calculate the new hours, minutes, and seconds
    const newHours = Math.floor(totalSeconds / 3600) % 24; // Modulo 24 to handle overflow beyond 24 hours
    const newMinutes = Math.floor((totalSeconds % 3600) / 60);
    const newSeconds = totalSeconds % 60;
    // Format the new time as "HH:mm:SS"
    const formattedTime = 
        String(newHours).padStart(2, '0') + ':' + 
        String(newMinutes).padStart(2, '0') + ':' + 
        String(newSeconds).padStart(2, '0');
  
    return formattedTime;
  }
}

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,FormsModule,CommonModule],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent implements OnInit{
  constructor(private service:AppService,private route:ActivatedRoute,private router :Router){}
  
  cur_date: string = FormatDate.getDate(new Date().toJSON());
  cur_time: string = FormatDate.getTime(new Date().toJSON());
  user = {} as EmpTab;
  AllSlots: SlotTab[] = [];
  EmpSlots: SlotTab[] = [];
  AllRooms: RoomTab[] = [];
  DispSlots = new Map<SlotTab,RoomTab>();
  AllconfirmData: ConfirmInfo[] = [];
  async initializeData(){
    try{
      const idParam = this.route.snapshot.paramMap.get('empID');
      if(idParam!==null)
      {
        const id = parseInt(idParam, 10);
        if (id > 0) {
          (await this.service.GetEmpID(id)).subscribe((element: EmpTab)=>{
            this.user=element
          })
        }else {
          console.error("Invalid ID parameter:", idParam);
        }
      }
      const confirmResponse = firstValueFrom(await this.service.GetAllInfo());
      this.AllconfirmData = (await confirmResponse);
      
      const slotsResponse = firstValueFrom(await this.service.GetAllSlots());
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
            this.DispSlots.set(slot,room);
          }
        })
      });

    }catch(error){
      console.error("Error initializing data",error)
    }
  }

  emp!: EmpTab;
  //Confirmation
  OnConfirm(slotID:number){
    //put to update Confirm's_bool
    this.AllconfirmData.forEach((confirmData: ConfirmInfo)=>{
      if(confirmData.confirm==false && slotID==confirmData.slotId){
        confirmData.confirm=true;
        this.service.ConfirmDone(confirmData).subscribe();
        alert("confirmed your booking")
      }else if(slotID==confirmData.slotId){
        alert("already confirmed");
      }
    })
  }

  async ngOnInit(): Promise<void> {
    const obj = localStorage.getItem("loginData");
    if(obj!=null) this.emp = JSON.parse(obj);
    if(this.emp==null) this.router.navigateByUrl('');

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
    (await this.service.DeleteSlot(element)).subscribe()
    this.DispSlots.clear();
    this.ngOnInit();
  }
}
