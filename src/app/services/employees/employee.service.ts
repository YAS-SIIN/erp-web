import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPath } from 'src/app/apiPath';
import { EmployeeModelData, EmployeeResponseModel } from 'src/app/models/employees/employee-model';
import { environment } from '../../../environments/environment'; 


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private _http: HttpClient;

  private _controllerPath: string = `${environment.baseUrl}${ApiPath.Employee}`;

  constructor(http: HttpClient) {
    this._http = http;
  }

  GetAllData() {
     
    let url = `${this._controllerPath}/Get`;

    return this._http.post<EmployeeResponseModel>(url, {}, {
     
    });
  }

  Insert(data:FormData) {
     
    let url = `${this._controllerPath}/Insert`;

    return this._http.post<EmployeeResponseModel>(url, data, { 
    });
  }

  
  Update(data:FormData) {
     
    let url = `${this._controllerPath}/Update`;

    return this._http.put<EmployeeResponseModel>(url, data, {
     
    });
  }

  Confirm(Id: number) {
     
    let url = `${this._controllerPath}/Confirm?Id=${Id}`;

    return this._http.put<EmployeeResponseModel>(url, {Id: Id}, {
     
    });
  }
 
  Delete(Id: number) {
     
    let url = `${this._controllerPath}/Delete?Id=${Id}`;

    return this._http.delete<EmployeeResponseModel>(url,  {
     
    });
  }
}
