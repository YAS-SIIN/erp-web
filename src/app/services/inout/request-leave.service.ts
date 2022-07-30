import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPath } from 'src/app/apiPath'; 
import { RequestLeaveFilterDto, RequestLeaveModelData, RequestLeaveResponseModel } from 'src/app/models/request-leave/request-leave-model';
import { environment } from '../../../environments/environment'; 


@Injectable({
  providedIn: 'root'
})
export class RequestLeaveService {
  private _http: HttpClient; 

  private _controllerPath: string = `${environment.baseUrl}${ApiPath.RequestLeave}`;

  constructor(http: HttpClient) {
    this._http = http; 
  }

  GetAllData(data: RequestLeaveFilterDto) {
     
    let url = `${this._controllerPath}/Get`;

    return this._http.post<RequestLeaveResponseModel>(url, data, {
     
    });
  }

  Insert(data:RequestLeaveModelData) {
     
    let url = `${this._controllerPath}/Insert`;

    return this._http.post<RequestLeaveResponseModel>(url, data, { 
    });
  }

  
  Update(data:RequestLeaveModelData) {
     
    let url = `${this._controllerPath}/Update`;

    return this._http.put<RequestLeaveResponseModel>(url, data, {
     
    });
  }

  Confirm(Id: number) {
     
    let url = `${this._controllerPath}/Confirm?Id=${Id}`;

    return this._http.put<RequestLeaveResponseModel>(url, {Id: Id}, {
     
    });
  }
 
  Delete(Id: number) {
     
    let url = `${this._controllerPath}/Delete?Id=${Id}`;

    return this._http.delete<RequestLeaveResponseModel>(url,  {
     
    });
  }
}
