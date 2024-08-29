import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { EmpTab } from './models/emp-tab';
import { Observable } from 'rxjs';
import { SlotTab } from './models/slot-tab';
import { RoomTab } from './models/room-tab';
import { ConfirmInfo } from './models/confirm-info';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AppService {
  //HttpClient to access API via HTTP requests
  constructor(private httpClient : HttpClient) {}
  
  //accessing Api
  baseAddress: string = "http://localhost:5222/api";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type' : 'application/json'
    })
  }
  
  /////EmpServices
  async GetEmpByEmail(emp: EmpTab): Promise<Observable<any>> {
    return this.httpClient.post(this.baseAddress+"/Employees/Email",JSON.stringify(emp),this.httpOptions)
  }

  async GetEmpID(id: number): Promise<Observable<any>>{
    return this.httpClient.get(this.baseAddress+`/Employees/${id}`,this.httpOptions);
  }

  async GetAllEmp(): Promise<Observable<any>>{
    return await this.httpClient.get(this.baseAddress+"/Employees",this.httpOptions);
  }

  ChangePassword(emp: EmpTab): Observable<any> {
    return this.httpClient.put(this.baseAddress + "/Employees/ChangePassword", JSON.stringify(emp), this.httpOptions);
  }

  async AddEmployee(emp: EmpTab): Promise<Observable<any>>{
    return await this.httpClient.post(this.baseAddress+"/Employees",JSON.stringify(emp),this.httpOptions);
  }

  async UpdateEmployee(emp: EmpTab): Promise<Observable<any>>{
    return await this.httpClient.put(this.baseAddress+"/Employees",JSON.stringify(emp),this.httpOptions);
  }
 ///////////////
 ////////SlotServices
  async GetSlotRoom(slot: SlotTab): Promise<Observable<any>>{
    return this.httpClient.post(this.baseAddress+"/Slots/Search",JSON.stringify(slot),this.httpOptions)
  }

  async GetAllSlots(): Promise<Observable<SlotTab[]>>{
    return this.httpClient.get<SlotTab[]>(this.baseAddress+"/Slots",this.httpOptions)
  }
  async GetSlotsByEmp(element: EmpTab): Promise<Observable<any>>{
    return this.httpClient.post(this.baseAddress+"/Employees/SearchEmp",JSON.stringify(element),this.httpOptions);
  }
  async GetSlotsByRoom(element: RoomTab): Promise<Observable<any>>{
    return this.httpClient.post(this.baseAddress+"/Slots/SearchRoom",JSON.stringify(element),this.httpOptions);
  }
  async DeleteSlot(element: SlotTab): Promise<Observable<any>>{
    return this.httpClient.put(this.baseAddress+"/Slots",JSON.stringify(element),this.httpOptions);
  }

  async AddSlot(slot: SlotTab): Promise<Observable<any>>{
    return this.httpClient.post(this.baseAddress+"/Slots",JSON.stringify(slot),this.httpOptions);
  }
  ///////////////
  /////RoomServices
  async GetAllRoom(): Promise<Observable<RoomTab[]>>{
    return this.httpClient.get<RoomTab[]>(this.baseAddress+"/Rooms",this.httpOptions);
  }

  async DeleteRoom(roomId:number): Promise<Observable<any>>{
    return this.httpClient.delete(this.baseAddress+`/Rooms/${roomId}`,this.httpOptions);
  }

  async GetRoomById(roomId:number): Promise<Observable<RoomTab>>{
    return this.httpClient.get<RoomTab>(this.baseAddress+`/Rooms/${roomId}`,this.httpOptions);
  }

  async EditRoom(room: RoomTab): Promise<Observable<any>>{
    return this.httpClient.put(this.baseAddress+"/Rooms",JSON.stringify(room),this.httpOptions);
  }

  async AddRoom(room: RoomTab): Promise<Observable<any>>{
    return await this.httpClient.post(this.baseAddress+"/Rooms",JSON.stringify(room),this.httpOptions);
  }
  //////////////Confirmation Service
  //post confirmation data; post(confinfo : obj)
  confirmAddress = "http://localhost:5155/api/ConfirmInfos";
  
  //  getall
  GetAllInfo(): Observable<ConfirmInfo[]>{
    return this.httpClient.get<ConfirmInfo[]>(this.confirmAddress,this.httpOptions);
  }
  // putconfirm
  ConfirmDone(Confirms: ConfirmInfo): Observable<any>{
    return this.httpClient.put(this.confirmAddress,JSON.stringify(Confirms),this.httpOptions);
  }
  // postconfirm
  async ConfirmReg(Confirm: ConfirmInfo): Promise<Observable<any>>{
    return this.httpClient.post(this.confirmAddress,JSON.stringify(Confirm),this.httpOptions);
  }
  /////////////
}
