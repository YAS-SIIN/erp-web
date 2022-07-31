 
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiPath } from 'src/app/apiPath';
import { environment } from 'src/environments/environment';
 

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private _controllerPath: string = `${environment.baseUrl}${ApiPath.Main}`;
  
  public dateNow: string='1111/11/11';

  public dateMask= [/\d/, /\d/,/\d/,/\d/, '/', /\d/, /\d/, '/', /\d/, /\d/];
  public timeMask= [/\d/, ':', /[0-5]/, /\d/];
  public mobileNumberMask = [/[0]/, /[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  public yearMask = [/[1-4]/,/\d/,/\d/,/\d/];

  //Enums
  public baseStatus: string[] =    ['غیرفعال', 'تایید شده', '', 'حذف شده'];
  public cartableStatus: string[] =    ['غیرفعال', 'تایید شده', 'همه'];
  public leaveTypeList: string[] = [ 'استحقاقی', 'استعلاجی', 'بدون حقوق'];
  public requestLeaveTypeList: string[] = [ 'روزانه', 'ساعتی' ];
  
  private _http: HttpClient;


  constructor(private toastr : ToastrService, http: HttpClient) {
    this._http = http;
   }
 
 
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


  GetPersianDate() {  
    let url = `${this._controllerPath}/GetPersianDate`;

     this._http.post<string>(url, {}, {}).subscribe(
      (data: string) => { 
        this.dateNow = data;
      },
      (responseError: HttpErrorResponse) => { 
        this.toastError('خطایی در انجام عملیات رخ داده است' + ' | ' + responseError.error.error.error_description, `کد خطای ${responseError.error.error.error_code}`);      
      });
  }


 //--------------- Errors
  errors: string[] = [];

  processModelStateErrors(form: NgForm, responseError: HttpErrorResponse) {
    this.errors=[];

    if (responseError.status === 400) {
      const modelStateErrors = responseError.error.error;
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
            this.toastError('خطایی در انجام عملیات رخ داده است' + ' | ' + modelStateErrors.error.error_description, `کد خطای ${modelStateErrors.error.error_code}`);
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
