import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuard } from './app-guard.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoggedInAppGuard } from './logged-in-app-guard.guard';
import { LoginComponent } from './pages/admin/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { ResetPasswordComponent } from './pages/admin/reset-password/reset-password.component';
import { EmployeeComponent } from './pages/employees/employee/employee.component';
import { RequestLeaveComponent } from './pages/inout/request-leave/request-leave.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent }, 
  { path: 'resetPassword', component: ResetPasswordComponent},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '', component: MainComponent, 
    children: [
      { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' }, 
      { path: 'employees/employee', component: EmployeeComponent, pathMatch: 'full' },
      { path: 'inout/requestleave', component: RequestLeaveComponent, pathMatch: 'full' }
    ]
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
