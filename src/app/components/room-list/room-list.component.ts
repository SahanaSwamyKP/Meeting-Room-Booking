import { Component } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [CommonModule,  FormsModule,RouterModule],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css'
})
export class RoomListComponent {
  date!: string;

  time!: string;

  capacity!: number;

  rooms: any[] = [];

  constructor(private bookingService: BookingService) { }

  onSearch() {

    this.bookingService.getAvailableRooms(this.date, this.time, this.capacity)

      .subscribe(rooms => this.rooms = rooms);

  }

  bookRoom(roomId: number) {

    const userId = 1; // Replace with actual user ID

    this.bookingService.bookRoom(roomId, userId, this.date, this.time)

      .subscribe(response => alert('Room booked successfully!'));

  }

}

