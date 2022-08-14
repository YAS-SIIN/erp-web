import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UsersForModalDto, UsersForModalResponseModel } from 'src/app/models/admin/account-model'; 
import { AccountService } from 'src/app/services/admin/account.service'; 
import { SharedService } from 'src/app/services/shared/shared.service';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styles: [`
    .mat-dialog-content {
      overflow: hidden !important;
      direction: rtl;
    }
  `]
})
export class UsersDialogComponent {
  
  _accountService: AccountService; 
  dataList:MatTableDataSource<UsersForModalDto>=new MatTableDataSource<UsersForModalDto>;
  displayedColumns: string[] = ['name', 'userName'];
  _sharedService: SharedService; 

  constructor(public dialogRef: MatDialogRef<UsersDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, sharedService: SharedService, accountService: AccountService) {
    this._sharedService = sharedService; 
    this._accountService = accountService; 
  }

   ngOnInit(): void { 
    this.getGridList();
    
   }
  
 
  getGridList() {   
    debugger
      this._accountService.GetUsersForModal().subscribe(
        (data: UsersForModalResponseModel) => { 
          this.dataList = new MatTableDataSource(data.data)
        },
        (responseError: HttpErrorResponse) => { 
          this._sharedService.toastError('خطایی در انجام عملیات رخ داده است' + ' | ' + responseError.error.error.error_description, `کد خطای ${responseError.error.error.error_code}`);      
        });
  }

  onCloseModalClick(): void {
    this.dialogRef.close();
  }

  
  applyFilter(event: Event) {
    debugger
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataList.filter = filterValue
  } 
}
