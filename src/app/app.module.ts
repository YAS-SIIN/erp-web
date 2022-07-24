import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input'; 
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatStepperModule } from '@angular/material/stepper'
import { MatSelectModule } from '@angular/material/select'
import { MatCardModule } from '@angular/material/card'
import { MatBadgeModule } from '@angular/material/badge'
import { MatDialogModule } from '@angular/material/dialog'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatTableModule } from '@angular/material/table'
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule} from '@angular/material/form-field';
import { ToastrModule } from 'ngx-toastr';
import { MatMenuModule } from '@angular/material/menu';
import { MatTreeModule } from '@angular/material/tree';
import { MatGridListModule } from '@angular/material/grid-list'; 
import { MatRadioModule } from '@angular/material/radio';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppGuard } from './app-guard.guard';
import { LoggedInAppGuard } from './logged-in-app-guard.guard';
import { AuthInterceptor } from './auth.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { MainComponent } from './pages/main/main.component'; 
import { EmployeeComponent } from './pages/employees/employee/employee.component';
import { ValidationMessageComponent } from './pages/others/validationmessage/validationmessagecomponent.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    DashboardComponent, 
    ValidationMessageComponent,

    EmployeeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatStepperModule,
    MatSelectModule,
    MatCardModule,
    MatBadgeModule,
    MatDialogModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatTableModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatMenuModule,
    MatTreeModule,
    MatGridListModule,
    MatRadioModule,
    NgxMatFileInputModule,
    
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,

    CommonModule, 
    ToastrModule.forRoot(),
    TextMaskModule
  ],
  providers: [AppGuard, LoggedInAppGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
