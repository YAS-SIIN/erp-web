import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPath } from 'src/app/apiPath';
import { environment } from '../../../environments/environment';
import { LoginDto, LoginResponseModel, SessionResponseModel } from '../../models/account/account-model'; 


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

    if (sessionModel.token == null || sessionModel.token == undefined)
      return false;

    if (new Date() > sessionModel.expirationTime)
      return false;

    return true;
  }

  Login(loginDto: LoginDto) {
    debugger
    let url = `${this._controllerPath}/Login`;

    return this._http.post<LoginResponseModel>(url, loginDto, {
     
    });
  }

  Logout() {
    let url = `${this._controllerPath}/logout`;

    return this._http.post<LoginResponseModel>(url, {});
  }

  GetToken() {
    if (!this.IsAuthenticated()) {
      if (this._router.url != "/login" && this._router.url != "/register" && this._router.url != "/resetPassword")
        this._router.navigate(['/login']);
    }

    let session = localStorage.getItem('session');
    let sessionModel: LoginResponseModel = JSON.parse(session!);
    if (sessionModel == null || sessionModel == undefined)
      return null;

    return sessionModel.data.token;
  }
  

  ResetPassword(mobileNumber: string, password: string, verificationCode: string) {
    let url = `${this._controllerPath}/resetPassword`;

    return this._http.post(url, {
      mobileNumber: mobileNumber,
      password: password,
      verificationCode: verificationCode
    }, { 
    });
  }
}
