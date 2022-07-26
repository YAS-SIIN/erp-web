import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms'; 
import { SharedService } from '../../../../services/shared/shared.service';
import { EmployeeModelData, EmployeeResponseModel } from 'src/app/models/employees/employee-model';
import { EmployeeService } from 'src/app/services/employees/employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../others/confirm-dialog/confirm-dialog.component';
 
@Component({
  selector: 'app-employees-employee-register-panel',
  templateUrl: './employee-register-panel.component.html' 
})
export class EmployeeRegisterPanelComponent implements OnInit {
  title = 'کارمندان';
  
  _sharedService: SharedService; 
  
 @Input() Model: EmployeeModelData = new EmployeeModelData; 
 @Input() showRegisterButton: boolean = false; 
 
 @Output() submitClicked: EventEmitter<any> = new EventEmitter<any>();
 
 constructor(private formBuilder: FormBuilder, sharedService: SharedService) {
    this._sharedService = sharedService; 
}

 
  ngOnInit(): void { 
 
   
  }
  
  onSubmitClick(form: NgForm) {
    this.submitClicked.emit(form);
  }

  }
 