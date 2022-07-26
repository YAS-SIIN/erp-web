 
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BaseStatus } from 'src/app/models/base-enums';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public dateMask= [/\d/, /\d/,/\d/,/\d/, '/', /\d/, /\d/, '/', /\d/, /\d/];
  public timeMask= [/\d/, ':', /[0-5]/, /\d/];
  public mobileNumberMask = [/[0]/, /[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

  public baseStatus = BaseStatus;
  
  constructor(private toastr : ToastrService) { }
 

  toastError(message: string, title: string = 'Error') {
    this.toastr.error(message, title);
  }

  toastInfo(message: string, title: string = 'Info') {
    this.toastr.info(message, title);
  }

  toastSuccess(message: string, title: string = 'Success') {
    this.toastr.success(message, title);
  }

  toastWarning(message: string, title: string = 'Warning') {
    this.toastr.warning(message, title);
  }

  errors: string[] = [];

  processModelStateErrors(form: NgForm, responseError: HttpErrorResponse) {
    this.errors=[];

    if (responseError.status === 400) {
      const modelStateErrors = responseError.error;
      for (const fieldName in modelStateErrors) {
        if (modelStateErrors.hasOwnProperty(fieldName)) {
         
          const modelStateError = modelStateErrors[fieldName];
          const control = form.controls[fieldName] || form.controls[this.lowerCaseFirstLetter(fieldName)] || form.controls[fieldName.split('.')[1]];
          if (control) {
            // integrate into Angular's validation
            control.setErrors({
              modelStateError: { error: modelStateError }
            });
          } else {
            // for cross field validations -> show the validation error at the top of the screen
            this.toastError('خطایی در انجام عملیات رخ داده است' + '|' + modelStateErrors.error.error_description, `کد خطای ${modelStateErrors.error.error_code}`);
          }
        }
      }
    } else {
      this.toastError('خطایی در انجام عملیات رخ داده است.');
    }
  }

  lowerCaseFirstLetter(data: string): string {
    return data.charAt(0).toLowerCase() + data.slice(1);
  }
}
