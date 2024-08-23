import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { SlotHistoryComponent } from './components/slot-history/slot-history.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { AddEmployeeComponent } from './components/employee-details/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/employee-details/edit-employee/edit-employee.component';
import { RoomDetailsComponent } from './components/room-details/room-details.component';
import { AddRoomComponent } from './components/room-details/add-room/add-room.component';
import { EditRoomComponent } from './components/room-details/edit-room/edit-room.component';

export const routes: Routes = [
    { path: 'admin', component: AdminComponent },
    {path:'employee-details',component:EmployeeDetailsComponent},
    {path:'add-employee',component:AddEmployeeComponent},
    { path: 'slot-history', component: SlotHistoryComponent },
    { path: 'edit-employee', component: EditEmployeeComponent },
    { path: 'add-room', component: AddRoomComponent },
    { path: 'edit-room', component : EditRoomComponent },
    {path:'room-details',component:RoomDetailsComponent},
    { path: '', redirectTo: '/admin', pathMatch: 'full'}
];
