import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpTab } from './models/emp-tab';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiurl='http://localhost:5013/api/Employees';


  constructor(private http: HttpClient) { }
  getEmployees(): Observable<EmpTab[]> {
    return this.http.get<EmpTab[]>(this.apiurl);
  }
  addEmployee(employee:EmpTab):Observable<EmpTab>{
    return this.http.post<EmpTab>(this.apiurl,employee);
  }
 


}
