import { Component } from '@angular/core';
import { RoomTab } from '../../../models/room-tab';
import { RoomService } from '../../../room.service';
import { Router,RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RoomDetailsComponent } from '../room-details.component';

@Component({
  selector: 'app-add-room',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule,RoomDetailsComponent],
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.css'
})
export class AddRoomComponent {
  room:RoomTab={
    roomId: 0,
    roomName: '',
    capacity: 0,
    available: true,
    slotTabs: []
  };
  constructor(private roomService:RoomService,private router:Router){}
  onSubmit()
  {
    this.roomService.addRoom(this.room).subscribe(()=>
    {
      alert("Room Added Successfully");
      this.router.navigateByUrl('/room-details')
    });
  }

}
