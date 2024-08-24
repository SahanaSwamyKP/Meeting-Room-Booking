import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RoomService } from '../../../room.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-room',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './edit-room.component.html',
  styleUrl: './edit-room.component.css'
})
export class EditRoomComponent implements OnInit {
  room: any = {};
  roomId:number=0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    const roomId = Number(this.route.snapshot.paramMap.get('roomId'));
    this.roomService.getRoomById(roomId).subscribe((data) => {
      this.room = data;
    });
  }

  saveChanges(): void {
    this.roomService.updateRoom(this.room.roomId, this.room).subscribe(() => {
      this.router.navigate(['/room-details']); // Redirect to rooms list after saving changes
    });
  }
}