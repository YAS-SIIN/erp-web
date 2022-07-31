import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';   
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog'; 
import { SharedService } from 'src/app/services/shared/shared.service';
import { ConfirmDialogComponent } from '../../others/confirm-dialog/confirm-dialog.component';
import { RequestLeaveService } from 'src/app/services/inout/request-leave.service';
import { RequestLeaveFilterDto, RequestLeaveModelData, RequestLeaveResponseModel } from 'src/app/models/request-leave/request-leave-model';
import { filter } from 'rxjs';
 
 

@Component({
  selector: 'app-inout-request-leave',
  templateUrl: './request-leave.component.html'
})
export class RequestLeaveComponent implements OnInit {
  groupTitle = 'ورود خروج';
  title = 'مرخصی';
 
  _requestLeaveService: RequestLeaveService; 
  _sharedService: SharedService; 
  public _dialog: MatDialog
  
  SaveMode = 'New'; 
  pnlBackForms = false;  
  pnlFirstPage = true; 
  pnlCreateEditForm = false; 
  pnlElements = false; 
  pnlFormView = false; 
  showRegisterButton = true; 

 
  displayedColumns: string[] = ['leaveType', 'requestLeaveType', 'fromDate_toDate', 'fromTime_toTime', 'status', 'description', 'actions'];
  NewEditRowModel: RequestLeaveModelData = new RequestLeaveModelData; 
  filterData: RequestLeaveFilterDto = new RequestLeaveFilterDto; 
  dataList: RequestLeaveModelData[] = []; 
 

  constructor(private formBuilder: FormBuilder, sharedService: SharedService, requestLeaveService: RequestLeaveService, dialog: MatDialog) {
    this._requestLeaveService = requestLeaveService; 
    this._sharedService = sharedService; 
    this._dialog = dialog; 
  }
 
 
  ngOnInit(): void { 
   this.getGridList();
   this._sharedService.GetPersianDate();
   this.filterData.status = 2;
  }
 
  getGridList() {  
      this._requestLeaveService.GetAllData(this.filterData).subscribe(
        (data: RequestLeaveResponseModel) => { 
          this.dataList = data.data
        },
        (responseError: HttpErrorResponse) => { 
          this._sharedService.toastError('خطایی در انجام عملیات رخ داده است' + ' | ' + responseError.error.error.error_description, `کد خطای ${responseError.error.error.error_code}`);      
        });
  }

  onOpenCreateEditFormPanel() {
    this.pnlFirstPage = false;
    this.pnlCreateEditForm = true;
    this.pnlBackForms = true;
    this.pnlElements = false;
    this.NewEditRowModel = new RequestLeaveModelData;
    this.NewEditRowModel.fromDate = this._sharedService.dateNow;
    this.NewEditRowModel.toDate = this._sharedService.dateNow;
    this.showRegisterButton = true; 
  }

  onBackAll() {
    this.pnlFirstPage = true;
    this.pnlBackForms = false;
    this.pnlCreateEditForm = false;
    this.pnlElements = false;
    this.pnlFormView = false;
  }
  
  onEdit(SelectedRow: RequestLeaveModelData){ 
    debugger
    this.SaveMode = 'Edit';
    this.onOpenCreateEditFormPanel();
    this.showRegisterButton = true;
    this.NewEditRowModel=SelectedRow;
  }

  onDetail(SelectedRow: RequestLeaveModelData){ 
    debugger
    this.SaveMode = 'Detail';
    this.onOpenCreateEditFormPanel();
    this.showRegisterButton = false;
    this.NewEditRowModel=SelectedRow;
  }

  onDelete(SelectedRow: RequestLeaveModelData){
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: '15vw',
      data: { message: "آیا مطمعن هستید ؟" }
    });
    dialogRef.afterClosed().subscribe(result => {
      debugger
      if (result == undefined)
        return;

        this._requestLeaveService.Delete(SelectedRow.id).subscribe(
          (data: RequestLeaveResponseModel) => {
     
            this._sharedService.toastSuccess('عملیات با موفقیت انجام شد');
            this.getGridList();
          },
          (responseError: HttpErrorResponse) => { 
            this._sharedService.toastError('خطایی در انجام عملیات رخ داده است' + ' | ' + responseError.error.error.error_description, `کد خطای ${responseError.error.error.error_code}`);
          });
    });  
  }
  
  onConfirm(SelectedRow: RequestLeaveModelData){
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: '15vw',
      data: { message: "آیا مطمعن هستید ؟" }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      debugger
      if (result == undefined)
        return;

        this._requestLeaveService.Confirm(SelectedRow.id).subscribe(
          (data: RequestLeaveResponseModel) => { 
            this._sharedService.toastSuccess('عملیات با موفقیت انجام شد');
            this.getGridList();
          },
          (responseError: HttpErrorResponse) => { 
            this._sharedService.toastError('خطایی در انجام عملیات رخ داده است' + ' | ' + responseError.error.error.error_description, `کد خطای ${responseError.error.error.error_code}`);
          });
    });   
     
  }
  
  onCreateEditElements(SelectedRow: RequestLeaveModelData){
    this.pnlFirstPage = false;
    this.pnlBackForms = true;
    this.pnlCreateEditForm = false;
    this.pnlElements = true;
    this.NewEditRowModel=SelectedRow;  
  }
  
  onSubmit(form: NgForm) {
    debugger
    this.NewEditRowModel.requestDate='1111/11/11';
    this.NewEditRowModel.leaveReason= this.NewEditRowModel.leaveReason || '';

  if (this.NewEditRowModel.requestLeaveType == 1){
    this.NewEditRowModel.fromDate = '1111/11/11';
    this.NewEditRowModel.toDate = '1111/11/11';
  } else {
    this.NewEditRowModel.timeLeaveDate = '1111/11/11';
    this.NewEditRowModel.fromTime = '00:00';
    this.NewEditRowModel.toTime = '00:00'; 
  }

    this.NewEditRowModel.fromDate
    if (this.SaveMode == 'New') {
  
     this._requestLeaveService.Insert(this.NewEditRowModel).subscribe(
      (data: RequestLeaveResponseModel) => {

        this.onBackAll();
        this.SaveMode = 'New';
        this.NewEditRowModel = new RequestLeaveModelData;
    
        this._sharedService.toastSuccess('عملیات با موفقیت انجام شد');
        this.getGridList();
      },
      (responseError: HttpErrorResponse) => { 
        this._sharedService.processModelStateErrors(form, responseError); 
      });
      // this.FormList.push(this.NewEditRowModel); 
    } else if (this.SaveMode == 'Edit') { 
      this._requestLeaveService.Update(this.NewEditRowModel).subscribe(
        (data: RequestLeaveResponseModel) => {
  
          this.onBackAll();
          this.SaveMode = 'New';
          this.NewEditRowModel = new RequestLeaveModelData;
      
          this._sharedService.toastSuccess('عملیات با موفقیت انجام شد');
          this.getGridList();
        },
        (responseError: HttpErrorResponse) => { 
          this._sharedService.processModelStateErrors(form, responseError); 
        });
    } 
  }
}
 

