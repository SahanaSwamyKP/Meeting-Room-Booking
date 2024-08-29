import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { EmployeePageComponent } from './components/employee-page/employee-page.component';
import { SlotHistoryComponent } from './components/admin-page/slot-history/slot-history.component';
import { EmployeeDetailsComponent } from './components/admin-page/employee-details/employee-details.component';
import { RoomDetailsComponent } from './components/admin-page/room-details/room-details.component';
import { MyBookingsComponent } from './components/employee-page/my-bookings/my-bookings.component';
import { EditRoomComponent } from './components/admin-page/room-details/edit-room/edit-room.component';
import { ChangePasswordComponent } from './components/employee-page/change-password/change-password.component';
import { AddRoomComponent } from './components/admin-page/room-details/add-room/add-room.component';
import { RoomSlotsComponent } from './components/room-slots/room-slots.component';
import { AddEmployeeComponent } from './components/admin-page/employee-details/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/admin-page/employee-details/edit-employee/edit-employee.component';

export const routes: Routes = [
    {path: "", redirectTo:'/login-page',pathMatch:'full'},
    {path:'login-page',component:LoginPageComponent},
    {path:'employee-page',component:EmployeePageComponent},
    {path:'employee-page/change-password',component:ChangePasswordComponent},
    {path:'employee-page/:empName/:empID',component:MyBookingsComponent},
    {path:'room-slots/:roomID',component:RoomSlotsComponent},
    {path:'admin-page',component:AdminPageComponent},
    {path:'admin-page/slot-history',component:SlotHistoryComponent},
    {path:'admin-page/employee-details',component:EmployeeDetailsComponent},
    {path:'admin-page/room-details',component:RoomDetailsComponent},
    {path:'admin-page/room-details/edit-room/:roomID',component:EditRoomComponent},
    {path:'admin-page/room-details/add-room',component:AddRoomComponent},
    {path:'admin-page/employee-details/add-employee',component:AddEmployeeComponent},
    {path:'admin-page/employee-details/edit-employee/:empID',component:EditEmployeeComponent}
];
