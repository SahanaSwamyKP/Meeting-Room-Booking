import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-slot-history',
  standalone: true,
  imports: [FormsModule , CommonModule],
  templateUrl: './slot-history.component.html',
  styleUrl: './slot-history.component.css'
})
export class SlotHistoryComponent {
  bookings = [
    { employeeName: 'John Doe', roomName: 'Conference Room A', date: '2024-08-21', startTime: '10:00 AM', endTime: '11:00 AM' },
    { employeeName: 'Jane Smith', roomName: 'Conference Room B', date: '2024-08-21', startTime: '1:00 PM', endTime: '2:00 PM' },
    // Add more mock bookings here
  ];

}
