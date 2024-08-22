import { Component } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent {
  bookings: any[] = [];

  constructor(private bookingService: BookingService) {
    this.loadBookings();
  }

  loadBookings() {
    const userId = 1; // Replace with actual user ID
    this.bookingService.getUserBookings(userId)
      .subscribe(bookings => this.bookings = bookings);
  }

  cancelBooking(bookingId: number) {
    this.bookingService.cancelBooking(bookingId)
      .subscribe(response => {
        alert('Booking canceled successfully!');
        this.loadBookings(); // Refresh bookings list
      });
  }
}

