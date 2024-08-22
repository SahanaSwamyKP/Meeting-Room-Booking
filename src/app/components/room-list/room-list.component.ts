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
  starttime:string='';
  endtime:string='';
 
  constructor(private bookingService: BookingService) { }
 
  onSearch() {
    // Check if no date is provided
    if (!this.date) {
      // If start time or end time is provided without a date
      if (this.starttime || this.endtime) {
        alert('Please enter a date.');
      } else {
        // If no date, start time, and end time are provided
        alert('Date is mandatory.');
      }
      return;
    }
  }
 
  // isFormValid():boolean{
  //   if(!this.date)
  //   {
  //     return false;
  //   }
  //   if((!this.starttime && this.endtime)||(this.starttime && !this.endtime))
  //   {
  //     return false;
  //   }
  //   return true;
  // }
 
  bookRoom(roomId: number) {
 
    const userId = 1; // Replace with actual user ID
 
    this.bookingService.bookRoom(roomId, userId, this.date, this.time)
 
      .subscribe(response => alert('Room booked successfully!'));
 
  }
 
}
 
 
