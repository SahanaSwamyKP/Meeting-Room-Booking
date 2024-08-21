import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RoomListComponent } from './components/room-list/room-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RoomListComponent,CommonModule,FormsModule,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'room-booking-app';
}
