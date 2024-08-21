import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({

  providedIn: 'root'

})

export class BookingService {

  private apiUrl = 'https://your-api-url.com'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getAvailableRooms(date: string, time: string, capacity: number): Observable<any> {

    return this.http.get(`${this.apiUrl}/rooms/available`, {

      params: { date, time, capacity }

    });

  }

  bookRoom(roomId: number, userId: number, date: string, time: string): Observable<any> {

    return this.http.post(`${this.apiUrl}/bookings`, { roomId, userId, date, time });

  }

  getUserBookings(userId: number): Observable<any> {

    return this.http.get(`${this.apiUrl}/bookings/user/${userId}`);

  }

  cancelBooking(bookingId: number): Observable<any> {

    return this.http.delete(`${this.apiUrl}/bookings/${bookingId}`);

  }
}
