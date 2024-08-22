import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { EmployeePageComponent } from './components/employee-page/employee-page.component';

export const routes: Routes = [
    {path: "", redirectTo:'components/login-page',pathMatch:'full'},
    {path:'components/login-page',component:LoginPageComponent},
    {path:'components/admin-page',component:AdminPageComponent},
    {path:'components/employee-page',component:EmployeePageComponent}
];
