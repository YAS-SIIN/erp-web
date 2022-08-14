import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms'; 
import { SharedService } from '../../../services/shared/shared.service'; 
import { ResetPasswordDto } from 'src/app/models/admin/account-model';
import { AccountService } from 'src/app/services/admin/account.service';
 
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {
  title = 'تغییر کلمه عبور';

  _sharedService: SharedService; 
  _accountService: AccountService; 
 
Model: ResetPasswordDto = new ResetPasswordDto; 
 
  constructor(
    private formBuilder: FormBuilder, sharedService: SharedService, accountService: AccountService) {
      this._sharedService = sharedService; 
      this._accountService = accountService; 
  }
 
 
  ngOnInit(): void {   
  }
  
  onSubmitClick(form: NgForm) {
debugger
       this._accountService.ResetPassword(this.Model
      ).subscribe(() => {
        this._sharedService.toastSuccess("عملیات با موفقیت انجام شد"); 
      }, (responseError) => {
        this._sharedService.toastError('خطایی در انجام عملیات رخ داده است' + ' | ' + responseError.error.error.error_description, `کد خطای ${responseError.error.error.error_code}`);
      });
  }
}
 