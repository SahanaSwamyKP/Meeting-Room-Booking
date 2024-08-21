import { Routes } from '@angular/router';
import { LayoutComponent } from './Pages/layout/layout.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { LoginComponent } from './Pages/login/login.component';

export const routes: Routes = [

    {
    path:'',
    redirectTo: 'loginsignup',
    pathMatch: 'full'
    },
    {
        path: 'loginsignup',
        component: LoginComponent
    }
];
