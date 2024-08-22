import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { SlotHistoryComponent } from './slot-history/slot-history.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: 'admin', component: AdminComponent },
  { path: 'employee-details', component: EmployeeDetailsComponent },
  { path: 'room-details', component: RoomDetailsComponent },
  { path: 'slot-history', component: SlotHistoryComponent },
  // {path: 'AdminPage', },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }