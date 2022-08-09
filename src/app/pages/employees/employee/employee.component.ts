import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms'; 
import { SharedService } from '../../../services/shared/shared.service';
import { EmployeeModelData, EmployeeResponseModel } from 'src/app/models/employees/employee-model';
import { EmployeeService } from 'src/app/services/employees/employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../others/confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
 
@Component({
  selector: 'app-employees-employee',
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit {
  groupTitle = 'کارمندان';
  title = 'کارمندان';
 
  _employeeService: EmployeeService; 
  _sharedService: SharedService; 
  public _dialog: MatDialog
  
  SaveMode = 'New'; 
  pnlBackForms = false;  
  pnlFirstPage = true; 
  pnlCreateEditForm = false;    
  showRegisterButton = true; 
 
  displayedColumns: string[] = ['name', 'empoloyeeNo', 'status', 'description', 'actions'];
  NewEditRowModel: EmployeeModelData = new EmployeeModelData; 
  //dataList: EmployeeModelData[] = []; 
  dataList:MatTableDataSource<EmployeeModelData>=new MatTableDataSource<EmployeeModelData>;

  constructor(
    private formBuilder: FormBuilder, sharedService: SharedService, employeeService: EmployeeService, dialog: MatDialog) {
  this._employeeService = employeeService; 
    this._sharedService = sharedService; 
    this._dialog = dialog; 
  }
 
 
  ngOnInit(): void { 
   this.getGridList();
   
  }
 
  getGridList() {  
  
      this._employeeService.GetAllData().subscribe(
        (data: EmployeeResponseModel) => {
          debugger
          this.dataList = new MatTableDataSource(data.data)
        },
        (responseError: HttpErrorResponse) => { 
          this._sharedService.toastError('خطایی در انجام عملیات رخ داده است' + ' | ' + responseError.error.error.error_description, `کد خطای ${responseError.error.error.error_code}`);      
        });
  }

  onOpenCreateEditFormPanel() {
    this.pnlFirstPage = false;
    this.pnlCreateEditForm = true;
    this.pnlBackForms = true; 
    this.showRegisterButton = true;
    this.NewEditRowModel = new EmployeeModelData;
  }

  onBackAll() {
    this.pnlFirstPage = true;
    this.pnlBackForms = false;
    this.pnlCreateEditForm = false; 
  }
 
  onEdit(SelectedRow: EmployeeModelData){ 
    debugger
    this.SaveMode = 'Edit';
    this.onOpenCreateEditFormPanel();
    this.showRegisterButton = true;
    this.NewEditRowModel=SelectedRow;
  }
 
  onDetail(SelectedRow: EmployeeModelData){ 
    debugger
    this.SaveMode = 'Detail';
    this.onOpenCreateEditFormPanel();
    this.showRegisterButton = false;
    this.NewEditRowModel=SelectedRow;
  }
 
  onDelete(SelectedRow: EmployeeModelData){
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: '15vw',
      data: { message: "آیا مطمئن هستید ؟" }
    });
    dialogRef.afterClosed().subscribe(result => { 
      if (result == undefined)
        return;

        this._employeeService.Delete(SelectedRow.id).subscribe(
          (data: EmployeeResponseModel) => {
     
            this._sharedService.toastSuccess('عملیات با موفقیت انجام شد');
            this.getGridList();
          },
          (responseError: HttpErrorResponse) => { 
            this._sharedService.toastError('خطایی در انجام عملیات رخ داده است' + ' | ' + responseError.error.error.error_description, `کد خطای ${responseError.error.error.error_code}`);
          });
    });  
  }
  
  onConfirm(SelectedRow: EmployeeModelData){
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: '15vw',
      data: { message: "آیا مطمئن هستید ؟" }
    });
    
    dialogRef.afterClosed().subscribe(result => { 
      if (result == undefined)
        return;

        this._employeeService.Confirm(SelectedRow.id).subscribe(
          (data: EmployeeResponseModel) => { 
            this._sharedService.toastSuccess('عملیات با موفقیت انجام شد');
            this.getGridList();
          },
          (responseError: HttpErrorResponse) => { 
            this._sharedService.toastError('خطایی در انجام عملیات رخ داده است' + ' | ' + responseError.error.error.error_description, `کد خطای ${responseError.error.error.error_code}`);
          });
    });   
     
  }
  
  onCreateEditElements(SelectedRow: EmployeeModelData){
    this.pnlFirstPage = false;
    this.pnlBackForms = true;
    this.pnlCreateEditForm = false; 
    this.NewEditRowModel=SelectedRow;  
  }
  
 
  onSubmit(form: NgForm) {
    debugger
    this.NewEditRowModel.imaghePath = '';
    let formData = new FormData();
    if (form.controls['imaghePath'].value != undefined) {
      let fileToUpload = <File>form.controls['imaghePath'].value;
      formData.append('File', fileToUpload);
      this.NewEditRowModel.imaghePath = fileToUpload.name;
    }
    
    this.NewEditRowModel.mobileNo = '0' +  this.NewEditRowModel.mobileNo;
   
    formData.append('EMPEmployee', JSON.stringify(this.NewEditRowModel));

    if (this.SaveMode == 'New') {
      this.NewEditRowModel.leaveDate = '';
 
     this._employeeService.Insert(formData).subscribe(
      (data: EmployeeResponseModel) => {

        this.onBackAll();
        this.SaveMode = 'New';
        this.NewEditRowModel = new EmployeeModelData;
    
        this._sharedService.toastSuccess('عملیات با موفقیت انجام شد');
        this.getGridList();
      },
      (responseError: HttpErrorResponse) => { 
        this._sharedService.processModelStateErrors(form, responseError); 
      });
      // this.FormList.push(this.NewEditRowModel); 
    } else if (this.SaveMode == 'Edit') { 
      this._employeeService.Update(formData).subscribe(
        (data: EmployeeResponseModel) => {
  
          this.onBackAll();
          this.SaveMode = 'New';
          this.NewEditRowModel = new EmployeeModelData;
      
          this._sharedService.toastSuccess('عملیات با موفقیت انجام شد');
          this.getGridList();
        },
        (responseError: HttpErrorResponse) => { 
          this._sharedService.processModelStateErrors(form, responseError); 
        });
    } 
  }
  
  applyFilter(event: Event) {
    debugger
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataList.filter = filterValue
  } 

 
}
 
 
