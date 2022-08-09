import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPath } from 'src/app/apiPath';
import { EmployeeModelData, EmployeeResponseModel } from 'src/app/models/employees/employee-model';
import { environment } from '../../../environments/environment';
import { LoginDto, LoginResponseModel, ResetPasswordDto, SessionResponseModel } from '../../models/admin/account-model'; 


@Injectable({
  providedIn: 'root'
})
export class AccountService implements OnInit {
  private _http: HttpClient;
  private _router: Router;

  private _controllerPath: string = `${environment.baseUrl}${ApiPath.Account}`;

  constructor(http: HttpClient, router: Router) {
    this._http = http;
    this._router = router;
  }

  ngOnInit(): void {

  }

  IsAuthenticated() {
    
    let session = localStorage.getItem('session');
    if (session == null || session == undefined)
      return false;

    let sessionModel: SessionResponseModel = JSON.parse(session);
    if (sessionModel == null || sessionModel == undefined)
      return false;

    if (sessionModel.data.token == null || sessionModel.data.token == undefined)
      return false;

    if (new Date() > sessionModel.data.expirationDate)
      return false;

    return true;
  }

  Login(loginDto: LoginDto) {
     
    let url = `${this._controllerPath}/Login`;

    return this._http.post<LoginResponseModel>(url, loginDto, {
     
    });
  }

  Logout() {
    let url = `${this._controllerPath}/Logout`;

    return this._http.post<LoginResponseModel>(url, {});
  }

  GetToken() {
    
    if (!this.IsAuthenticated()) {
      if (this._router.url != "/Login" && this._router.url != "/ResetPassword")
        this._router.navigate(['/Login']);
    }

    let session = localStorage.getItem('session');
    let sessionModel: SessionResponseModel = JSON.parse(session!);
    if (sessionModel == null || sessionModel == undefined)
      return null;

    return sessionModel.data.token;
  }
  

  ResetPassword(data: ResetPasswordDto) {
    let url = `${this._controllerPath}/ResetPassword`;

    return this._http.post(url, data, { 
    });
  }
  
  
  GetAccountInfo() {  
    let token = this.GetToken();
    let url = `${this._controllerPath}/GetAccountInfo?token=${token}`;
    return this._http.post<EmployeeResponseModel>(url, {}, {

     });
  }


}
