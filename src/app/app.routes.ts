import { Routes } from '@angular/router';
import { RoomListComponent } from './components/room-list/room-list.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { LogoutComponent } from './components/logout/logout.component';


export const routes: Routes = [

    { path: 'rooms', component: RoomListComponent },
  { path: 'my-bookings', component: MyBookingsComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'logout', component: LogoutComponent },

  { path: '', redirectTo: '/rooms', pathMatch: 'full' },
  { path: '**', redirectTo: '/rooms', pathMatch: 'full' }
  ];
