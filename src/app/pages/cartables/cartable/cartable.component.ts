import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';   
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog'; 
import { SharedService } from 'src/app/services/shared/shared.service';
import { ConfirmDialogComponent } from '../../others/confirm-dialog/confirm-dialog.component'; 

import { CartableService } from 'src/app/services/cartables/cartable.service';
import { CartableBaseModel } from 'src/app/models/base-model';
import { SPCartableListModelData, SPCartableListResponseModel } from 'src/app/models/cartables/cartable-model';
import { ApiPath } from 'src/app/apiPath';
import { environment } from 'src/environments/environment';
 
 

@Component({
  selector: 'app-cartables-cartable',
  templateUrl: './cartable.component.html'
})
export class CartableComponent implements OnInit {
  groupTitle = 'کارتابل';
  title = 'کارتابل';

 
  _cartableService: CartableService; 
  _sharedService: SharedService; 
  public _dialog: MatDialog
  
  SaveMode = 'New'; 
  pnlBackForms = false;  
  pnlFirstPage = true;   
  pnlSign = false;   
  
  pnlRequestLeave = false;
 
  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this.formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });

  displayedColumns: string[] = ['FormNameFa', 'signTitleFa', 'fieldCode', 'requestDate', 'actions'];
  NewEditRowModel: SPCartableListModelData = new SPCartableListModelData; 
  RowModel: any; 
  filterData: CartableBaseModel = new CartableBaseModel; 
  dataList: SPCartableListModelData[] = []; 
 

  constructor(private formBuilder: FormBuilder, sharedService: SharedService, cartableService: CartableService, dialog: MatDialog) {
    this._cartableService = cartableService; 
    this._sharedService = sharedService; 
    this._dialog = dialog; 
  }
 
 
  ngOnInit(): void { 
    this.filterData.status = 0;
    this._sharedService.GetPersianDate();
    this.filterData.year = parseInt(this._sharedService.dateNow.substr(0,4));
   this.getGridList();
  }
 
  getGridList() {  
      this._cartableService.GetAllData(this.filterData).subscribe(
        (data: SPCartableListResponseModel) => { 
          this.dataList = data.data
        },
        (responseError: HttpErrorResponse) => { 
          this._sharedService.toastError('خطایی در انجام عملیات رخ داده است' + ' | ' + responseError.error.error.error_description, `کد خطای ${responseError.error.error.error_code}`);      
        });
  }
 
  onOpenCreateEditFormPanel() {
    this.pnlFirstPage = false; 
    this.pnlBackForms = true; 
    this.NewEditRowModel = new SPCartableListModelData;  
    this.RowModel = null; 
    this.pnlSign = true; 
  }

  onBackAll() {
    this.pnlFirstPage = true;
    this.pnlBackForms = false; 
    this.pnlSign = false;

    this.pnlRequestLeave = false;
  }
   
  onDetail(SelectedRow: SPCartableListModelData){ 
    debugger
    this.SaveMode = 'Detail';  
    this.NewEditRowModel=SelectedRow;
    
    switch (this.NewEditRowModel.carTableId) {
      case 2:
        this._cartableService.GetRequestLeaveData(this.NewEditRowModel.fieldCode).subscribe(
          (data: any) => { 
            this.onOpenCreateEditFormPanel();
            this.RowModel = data.data
            this.pnlRequestLeave = true;
          },
          (responseError: HttpErrorResponse) => { 
            this._sharedService.toastError('خطایی در انجام عملیات رخ داده است' + ' | ' + responseError.error.error.error_description, `کد خطای ${responseError.error.error.error_code}`);      
          });
        
        break;
      case 3:
        this.pnlRequestLeave = true;
    }
  }

  onDelete(SelectedRow: SPCartableListModelData){
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: '15vw',
      data: { message: "آیا مطمئن هستید ؟" }
    });
    dialogRef.afterClosed().subscribe(result => { 
      if (result == undefined)
        return;

        this._cartableService.Delete(SelectedRow.fieldCode).subscribe(
          (data: SPCartableListResponseModel) => {
     
            this._sharedService.toastSuccess('عملیات با موفقیت انجام شد');
            this.getGridList();
          },
          (responseError: HttpErrorResponse) => { 
            this._sharedService.toastError('خطایی در انجام عملیات رخ داده است' + ' | ' + responseError.error.error.error_description, `کد خطای ${responseError.error.error.error_code}`);
          });
    });  
  }
  
  onConfirm(SelectedRow: SPCartableListModelData){
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: '15vw',
      data: { message: "آیا مطمئن هستید ؟" }
    });
    
    dialogRef.afterClosed().subscribe(result => { 
      if (result == undefined)
        return;

        this._cartableService.Confirm(SelectedRow.fieldCode).subscribe(
          (data: SPCartableListResponseModel) => { 
            this._sharedService.toastSuccess('عملیات با موفقیت انجام شد');
            this.getGridList();
          },
          (responseError: HttpErrorResponse) => { 
            this._sharedService.toastError('خطایی در انجام عملیات رخ داده است' + ' | ' + responseError.error.error.error_description, `کد خطای ${responseError.error.error.error_code}`);
          });
    });   
     
  }
  
}
 

