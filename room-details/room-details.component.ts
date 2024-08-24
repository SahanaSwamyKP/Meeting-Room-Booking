import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoomTab } from '../../models/room-tab';
import { RoomService } from '../../room.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.css'
})
export class RoomDetailsComponent implements OnInit{
  rooms: RoomTab[] = [];

  constructor(private roomService:RoomService ) {}

  ngOnInit(): void {
    this.fetchRooms();
  }

  // Fetch employees from the service
  fetchRooms(): void {
    
    this.roomService.getRooms().subscribe(
      (data: RoomTab[]) => {
        this.rooms = data;
      },
      (error) => {
        console.error('Error fetching room data', error);
      }
    );
  }
  deleteRoom(roomId:number):void{
    if(confirm("Are You Sure You Want to delete this room?"))
    {
      this.roomService.deleteRoom(roomId).subscribe(()=>
      {
        this.rooms=this.rooms.filter(room=>room.roomId!==roomId);
      })
    }
  }

}
