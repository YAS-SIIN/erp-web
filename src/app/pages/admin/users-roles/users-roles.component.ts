import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms'; 
import { SharedService } from '../../../services/shared/shared.service';
import { EmployeeModelData, EmployeeResponseModel } from 'src/app/models/employees/employee-model'; 
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../others/confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { UsersDialogComponent } from '../../others/users-dialog/users-dialog.component';
import { UsersRolesService } from 'src/app/services/admin/users-roles.service';
import { UserRoleModelData, UserRoleResponseModel } from 'src/app/models/admin/users-roles-model';
 
@Component({
  selector: 'app-admin-users-roles',
  templateUrl: './users-roles.component.html'
})
export class UsersRolesComponent implements OnInit {
  groupTitle = 'ادمین';
  title = 'دسترسی کاربران';
 
  _usersRolesService: UsersRolesService; 
  _sharedService: SharedService; 
  public _dialog: MatDialog
  
  SaveMode = 'New'; 
  pnlBackForms = false;  
  pnlFirstPage = true; 
  pnlCreateEditForm = false;    
  showRegisterButton = true; 
 
  displayedColumns: string[] = ['name', 'empoloyeeNo', 'description', 'actions'];
  NewEditRowModel: EmployeeModelData = new EmployeeModelData; 
  //dataList: EmployeeModelData[] = []; 
  dataList:MatTableDataSource<UserRoleModelData>=new MatTableDataSource<UserRoleModelData>;

  constructor(
    private formBuilder: FormBuilder, sharedService: SharedService, usersRolesService: UsersRolesService, dialog: MatDialog) {
    this._usersRolesService = usersRolesService; 
    this._sharedService = sharedService; 
    this._dialog = dialog; 
  }
 
 
  ngOnInit(): void { 
   this.getGridList();
   
  }
 
  getGridList() {   
      this._usersRolesService.GetAllData().subscribe(
        (data: UserRoleResponseModel) => {
          debugger
          this.dataList = new MatTableDataSource(data.data)
        },
        (responseError: HttpErrorResponse) => { 
          this._sharedService.toastError('خطایی در انجام عملیات رخ داده است' + ' | ' + responseError.error.error.error_description, `کد خطای ${responseError.error.error.error_code}`);      
        });
  }

  onOpenUsersModal() {
    const dialogRef = this._dialog.open(UsersDialogComponent, {
      width: '80%',
      direction:"rtl",
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
   
  onConfirm(SelectedRow: EmployeeModelData){
 
     
  }
   
  applyFilter(event: Event) {
    debugger
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataList.filter = filterValue
  } 

 
}
 
 
