import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms'; 
import { SharedService } from '../../../services/shared/shared.service';
import { EmployeeModelData, EmployeeResponseModel } from 'src/app/models/employees/employee-model';
import { EmployeeService } from 'src/app/services/employees/employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog'; 
import { RequestLeaveModelData } from 'src/app/models/request-leave/request-leave-model';
 
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {
  title = 'مرخصی';

  _sharedService: SharedService; 
 
 @Input() Model: RequestLeaveModelData = new RequestLeaveModelData; 
 @Input() showRegisterButton: boolean = false; 
 
 @Output() submitClicked: EventEmitter<any> = new EventEmitter<any>();
 
  constructor(
    private formBuilder: FormBuilder, sharedService: SharedService) {
      this._sharedService = sharedService; 
  }
 
 
  ngOnInit(): void {   
  }
  
  onSubmitClick(form: NgForm) {
    this.submitClicked.emit(form);
  }
 
  }
 