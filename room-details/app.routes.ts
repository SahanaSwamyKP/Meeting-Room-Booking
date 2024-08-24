import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { EmployeePageComponent } from './components/employee-page/employee-page.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { AddEmployeeComponent } from './components/employee-details/add-employee/add-employee.component';
import { RoomDetailsComponent } from './components/room-details/room-details.component';
import { AddRoomComponent } from './components/room-details/add-room/add-room.component';
import { EditRoomComponent } from './components/room-details/edit-room/edit-room.component';

export const routes: Routes = [
    {path: "", redirectTo:'components/login-page',pathMatch:'full'},
    {path:'components/login-page',component:LoginPageComponent},
    {path:'components/admin-page',component:AdminPageComponent},
    {path:'components/employee-page',component:EmployeePageComponent},
    {path:'employee-details',component:EmployeeDetailsComponent},
    {path:'add-employee',component:AddEmployeeComponent},
    {path:'room-details',component:RoomDetailsComponent},
    {path:'add-room',component:AddRoomComponent},
    {path:'edit-room/:roomId',component:EditRoomComponent}
];
