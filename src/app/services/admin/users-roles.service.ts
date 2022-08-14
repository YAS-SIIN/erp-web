import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPath } from 'src/app/apiPath';
import { UserRoleResponseModel } from 'src/app/models/admin/users-roles-model';
import { EmployeeModelData, EmployeeResponseModel } from 'src/app/models/employees/employee-model';
import { environment } from '../../../environments/environment'; 


@Injectable({
  providedIn: 'root'
})
export class UsersRolesService {
  private _http: HttpClient;

  private _controllerPath: string = `${environment.baseUrl}${ApiPath.UsersRoles}`;

  constructor(http: HttpClient) {
    this._http = http;
  }

  GetAllData() {
     
    let url = `${this._controllerPath}/Get?UserId=1`;

    return this._http.post<UserRoleResponseModel>(url, {}, {
     
    });
  }

  InsertUpdate(data:FormData) {
     
    let url = `${this._controllerPath}/InsertUpdate`;

    return this._http.post<UserRoleResponseModel>(url, data, { 
    });
  }

  
}
