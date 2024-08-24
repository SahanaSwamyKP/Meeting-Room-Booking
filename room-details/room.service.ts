import { Injectable } from '@angular/core';
import { RoomTab } from './models/room-tab';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private apiurl='http://localhost:5013/api/Rooms';


  constructor(private http: HttpClient) { }
  getRooms(): Observable<RoomTab[]> {
    return this.http.get<RoomTab[]>(this.apiurl);
  }
  addRoom(room:RoomTab):Observable<RoomTab>{
    return this.http.post<RoomTab>(this.apiurl,room);
  }
  // deleteRoom(roomId:number):Observable<void>{
  // return this.http.delete<void>(this.apiurl);
  // }
  deleteRoom(roomId: number):Observable<void>{
    const url = `${this.apiurl}?roomId=${roomId}`;
    return this.http.delete<void>(url);
  }
  getRoomById(roomId: number) {
    return this.http.get<any>(`${this.apiurl}/${roomId}`);
  }

  updateRoom(roomId: number, roomData: any) {
    return this.http.put(`${this.apiurl}/${roomId}`, roomData);
  }
}
