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
  selector: 'app-cartables-cartable',
  templateUrl: './cartable.component.html'
})
export class CartableComponent implements OnInit {
  groupTitle = 'کارتابل';
  title = 'کارتابل';

 
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
 
  displayedColumns: string[] = ['leaveType', 'requestLeaveType', 'fromDate_toDate', 'status', 'description', 'actions'];
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
 
  onBackAll() {
    this.pnlFirstPage = true;
    this.pnlBackForms = false;
    this.pnlCreateEditForm = false;
    this.pnlElements = false;
    this.pnlFormView = false;
  }
   
  onDetail(SelectedRow: RequestLeaveModelData){ 
    debugger
    this.SaveMode = 'Detail'; 
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
  
}
 

