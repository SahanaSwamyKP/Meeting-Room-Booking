import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { HeaderComponent } from '../../../header/header.component';
import { FooterComponent } from '../../../footer/footer.component';
import { CommonModule } from '@angular/common';
import { EmpTab } from '../../../../models/emp-tab';
import { RoomTab } from '../../../../models/room-tab';

@Component({
  selector: 'app-edit-room',
  standalone: true,
  imports: [FormsModule,RouterModule,HeaderComponent,FooterComponent,CommonModule],
  templateUrl: './edit-room.component.html',
  styleUrl: './edit-room.component.css'
})
export class EditRoomComponent implements OnInit {
  emp!: EmpTab;
 room: any = {};
  constructor(
    private route: ActivatedRoute,
    private service: AppService
  ) {}

  async ngOnInit() {
    const obj = localStorage.getItem("loginData");
    if(obj!=null) this.emp = JSON.parse(obj);
    const roomId = Number(this.route.snapshot.paramMap.get('roomID'));
    (await this.service.GetRoomById(roomId)).subscribe((data: RoomTab) => {
      this.room = data;
    });
  }

  saveChanges(): void {
    this.service.EditRoom(this.room).subscribe((res) => {
      alert('Room updated Successfully')
    });
  }
}