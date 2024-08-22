import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { EmpTab } from './models/emp-tab';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AppService {
  //HttpClient to access API via HTTP requests
  constructor(private httpClient : HttpClient) {}
  
  //accessing Api
  baseAddress: string = "http://localhost:5026/api";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type' : 'application/json'
    })
  }

  //To Transfer Data between Components using services.
  private data: any;
  setData(data: any){ if(data==undefined) return; this.data=data}
  getData(){
    var Data = this.data;
    return Data;
  }
  clearData(){this.data=undefined}

  async GetEmpByEmail(emp: EmpTab): Promise<Observable<any>> {
    return await this.httpClient.post(this.baseAddress+"/Employees/Email",JSON.stringify(emp),this.httpOptions)
  }

}
