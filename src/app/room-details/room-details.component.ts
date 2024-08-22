import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.css'
})
export class RoomDetailsComponent {
  rooms = [
    { id: 1, name: 'Mississippi', capacity: 24, available: true },
    { id: 2, name: 'Florida', capacity: 50, available: false },
    // Add more employees as needed
  ];

  editRoom(room: any) {
    // Logic to edit employee
    console.log('Editing employee:', room);
  }

  addRoom() {
    // Logic to add a new employee
    console.log('Adding new Room');
  }

  deleteRoom(room: any) {
    // Logic to edit employee
    console.log('Deleting employee:', room);
  }
  // onDeleteClick(){
  //   this.onDelete.emit(this.empObj.empId);
  // }
}
