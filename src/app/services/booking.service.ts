import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable , of} from 'rxjs';

@Injectable({

  providedIn: 'root'

})

export class BookingService {

  private apiUrl = 'https://your-api-url.com'; // Replace with your API URL

  constructor(private http: HttpClient) { }

//   getAvailableRooms(date: string, time: string, capacity: number): Observable<any> {

//     return this.http.get(`${this.apiUrl}/rooms/available`, {

//       params: { date, time, capacity }

//     });

//   }

bookRoom(roomId: number, userId: number, date: string, time: string): Observable<any> {

    return this.http.post(`${this.apiUrl}/bookings`, { roomId, userId, date, time });

  }

//   getUserBookings(userId: number): Observable<any> {

//     return this.http.get(`${this.apiUrl}/bookings/user/${userId}`);

//   }

  cancelBooking(bookingId: number): Observable<any> {

    return this.http.delete(`${this.apiUrl}/bookings/${bookingId}`);

  }
// }
getAvailableRooms(date: string, time: string, capacity: number): Observable<any> {
  const mockRooms = [
    { id: 1, name: 'Conference Room A', capacity: 10 },
    { id: 2, name: 'Conference Room B', capacity: 20 },
  ];
  return of(mockRooms); // 'of' is an RxJS operator that creates an observable from the static data
}

getUserBookings(userId: number): Observable<any> {
  const mockBookings = [
    { id: 1, roomName: 'Conference Room A', date: '2024-08-21', time: '10:00' },
    { id: 2, roomName: 'Conference Room B', date: '2024-08-22', time: '14:00' },
  ];
  return of(mockBookings);
}
}
