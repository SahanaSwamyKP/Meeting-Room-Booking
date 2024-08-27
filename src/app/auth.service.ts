import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmpTab } from './models/emp-tab';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private authUrl = "http://localhost:5222/api/Auth/login";
 
  constructor(private http: HttpClient) { }
 
  async getJwtToken(user: EmpTab): Promise<Observable<Response>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Response>(this.authUrl, user, { headers });
  }
}
