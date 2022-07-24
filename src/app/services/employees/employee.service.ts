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
  private _router: Router;

  private _controllerPath: string = `${environment.baseUrl}${ApiPath.Employee}`;

  constructor(http: HttpClient, router: Router) {
    this._http = http;
    this._router = router;
  }

  GetData() {
     
    let url = `${this._controllerPath}/Get`;

    return this._http.post<EmployeeResponseModel>(url, {}, {
     
    });
  }

  Insert(data:FormData) {
     
    let url = `${this._controllerPath}`;

    return this._http.post<EmployeeResponseModel>(url, data, {
     
    });
  }

  
  Update(data:EmployeeModelData) {
     
    let url = `${this._controllerPath}`;

    return this._http.put<EmployeeResponseModel>(url, data, {
     
    });
  }

  Confirm(Id: number) {
     
    let url = `${this._controllerPath}/Confirm`;

    return this._http.put<EmployeeResponseModel>(url, {}, {
     
    });
  }
 
  Delete(Id: number) {
     
    let url = `${this._controllerPath}${Id}`;

    return this._http.delete<EmployeeResponseModel>(url,  {
     
    });
  }
}
