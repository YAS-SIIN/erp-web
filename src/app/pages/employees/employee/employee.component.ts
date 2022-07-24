import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms'; 
import { SharedService } from '../../../services/shared/shared.service';
import { EmployeeModelData, EmployeeResponseModel } from 'src/app/models/employees/employee-model';
import { EmployeeService } from 'src/app/services/employees/employee.service';
import { HttpErrorResponse } from '@angular/common/http';
  
@Component({
  selector: 'app-employees-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  title = 'کارمندان';

  
  
  _employeeService: EmployeeService; 
  _sharedService: SharedService; 
  
  SaveMode = 'New'; 
  pnlBackForms = false;  
  pnlFirstPage = true; 
  pnlCreateEditForm = false; 
  pnlElements = false; 
  pnlFormView = false; 

  displayedColumns: string[] = ['FormName', 'Desciption', 'Actions'];
  NewEmployeeModel: EmployeeModelData = new EmployeeModelData; 
  EmployeeData: EmployeeResponseModel = new EmployeeResponseModel; 
 

  constructor(
    private formBuilder: FormBuilder, sharedService: SharedService, employeeService: EmployeeService 
  ) {
  this._employeeService = employeeService; 
    this._sharedService = sharedService; 
  }

  ngOnInit(): void { 
 
  }
 
  onOpenCreateEditFormPanel() {
    this.pnlFirstPage = false;
    this.pnlCreateEditForm = true;
    this.pnlBackForms = true;
    this.pnlElements = false;
    this.NewEmployeeModel = new EmployeeModelData;
  }

  onBackAll() {
    this.pnlFirstPage = true;
    this.pnlBackForms = false;
    this.pnlCreateEditForm = false;
    this.pnlElements = false;
    this.pnlFormView = false;
  }
 
  onOpenFormviewer(SelectedRow: EmployeeModelData){
    this.pnlFirstPage = false;
    this.pnlBackForms = true;
    this.pnlCreateEditForm = false;
    this.pnlFormView = true;
    this.NewEmployeeModel=SelectedRow;  
  }
  
  onEdit(SelectedRow: EmployeeModelData){ 
    this.SaveMode = 'Edit';
    this.onOpenCreateEditFormPanel();
    this.NewEmployeeModel=SelectedRow;
  }
 
  onDelete(SelectedRow: EmployeeModelData){
 
    if(confirm('Are you sure?')){
      //this.FormList = this.FormList.filter(f =>f.Id != SelectedRow.Id);
      //this._formService.saveForm(this.FormList);
  
      this._sharedService.toastSuccess('عملیات با موفقیت انجام شد');
    }
        
  }
  
  onCreateEditElements(SelectedRow: EmployeeModelData){
    this.pnlFirstPage = false;
    this.pnlBackForms = true;
    this.pnlCreateEditForm = false;
    this.pnlElements = true;
    this.NewEmployeeModel=SelectedRow;  
  }
  
  onSubmit(form: NgForm) {
    debugger
    let formData = new FormData();
     let fileToUpload = <File>form.controls['ImaghePath'].value;
     this.NewEmployeeModel.ImaghePath='';
    formData.append('file', fileToUpload);
    formData.append('EMPEmployee', JSON.stringify(this.NewEmployeeModel));
    if (this.SaveMode == 'New') {
     //const MaxId= Math.max.apply(Math, this.FormList.map(o => { return o.Id; }));
     //this.NewEmployeeModel.Id=MaxId + 1;
     this._employeeService.Insert(formData).subscribe(
      (data: EmployeeResponseModel) => {
  
        this.onBackAll();
        this.SaveMode = 'New';
        this.NewEmployeeModel = new EmployeeModelData;
    
        this._sharedService.toastSuccess('عملیات با موفقیت انجام شد');
      },
      (responseError: HttpErrorResponse) => { 
        this._sharedService.toastError('خطایی در انجام عملیات رخ داده است' + '|' + responseError.error.error.error_description);
        console.log("Response Error", responseError);
        this._sharedService.processModelStateErrors(form, responseError);
      });
      // this.FormList.push(this.NewEmployeeModel); 
    } else if (this.SaveMode == 'Edit') { 
      // this.FormList = this.FormList.map(a => {
      //   if(a.Id !== this.NewEmployeeModel?.Id){
      //     return a;
      //   }
      //   else{
      //     return this.NewEmployeeModel;
      //   }
      // });
    }
    
    // this._formService.saveForm(this.FormList);

    
  }
}
 
