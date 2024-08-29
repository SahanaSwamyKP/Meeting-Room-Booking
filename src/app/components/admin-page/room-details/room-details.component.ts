import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RoomTab } from '../../../models/room-tab';
import { AppService } from '../../../app.service';
import { FooterComponent } from '../../footer/footer.component';
import { HeaderComponent } from '../../header/header.component';
import { EmpTab } from '../../../models/emp-tab';

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule,FooterComponent,HeaderComponent],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.css'
})
export class RoomDetailsComponent implements OnInit{
  rooms!: RoomTab[];
  emp!: EmpTab;
  constructor(private service: AppService,private router: Router) {}

  async ngOnInit(): Promise<void> {
    const obj = localStorage.getItem("loginData");
    if(obj!=null) this.emp = JSON.parse(obj);
    if(this.emp==null) this.router.navigateByUrl('');
    
    (await this.service.GetAllRoom()).subscribe((res: any)=>{
      this.rooms=res;
      this.rooms.sort((a,b)=>{
        if(a.capacity>b.capacity) return 1;
        else return -1;
      })
      this.filteredRooms = this.rooms.slice(); // Initialize filteredRooms
      this.applyFilter(); // Apply filter on initialization
    })
  }

  searchTerm:string="";
  filteredRooms!: RoomTab[];
  applyFilter(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredRooms = this.rooms.filter(room =>
      room.roomName.toLowerCase().includes(term) ||
      room.capacity.toString().includes(term) ||
      (room.available ? 'yes' : 'no').includes(term)
    );
    this.filteredRooms.sort((a, b) => {
      // Optional: Define your sort criteria here if needed
      return a.roomName.localeCompare(b.roomName);
    });
  }

  async deleteRoom(roomId:number):Promise<void>{
    if(confirm("Are You Sure You Want to delete this room?"))
    {
      (await this.service.DeleteRoom(roomId)).subscribe((res)=>
      {
        this.rooms=this.rooms.filter(room=>room.roomId!==roomId);
        this.applyFilter();
      })
    }
    this.ngOnInit();
  }

}