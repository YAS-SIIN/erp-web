import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms'; 
import { SharedService } from '../../../../services/shared/shared.service';
import { EmployeeModelData, EmployeeResponseModel } from 'src/app/models/employees/employee-model';
import { EmployeeService } from 'src/app/services/employees/employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../others/confirm-dialog/confirm-dialog.component';
import { RequestLeaveModelData } from 'src/app/models/request-leave/request-leave-model';
 
@Component({
  selector: 'app-request-leave-register-panel',
  templateUrl: './request-leave-register-panel.component.html'
})
export class RequestLeaveRegisterPanelComponent implements OnInit {
  title = 'مرخصی';

  _sharedService: SharedService; 

  timeLeave = false; 
  unpaidLeave = false; 
  
 @Input() Model: RequestLeaveModelData = new RequestLeaveModelData; 
 @Input() showRegisterButton: boolean = false; 
 
 @Output() submitClicked: EventEmitter<any> = new EventEmitter<any>();
 
  constructor(
    private formBuilder: FormBuilder, sharedService: SharedService) {
      this._sharedService = sharedService; 
  }
 
 
  ngOnInit(): void { 
    debugger
    this.onChangeRequestLeaveType(); 
  }
  
  onSubmitClick(form: NgForm) {
    this.submitClicked.emit(form);
  }

  onChangeRequestLeaveType(){ 
    this.timeLeave = this.Model.requestLeaveType == 0 ? false : true;
  }
  }
 