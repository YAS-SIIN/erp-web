import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core'; 
import { ApiPath } from 'src/app/apiPath'; 
import { CartableBaseModel } from 'src/app/models/base-model';
import { SPCartableListResponseModel } from 'src/app/models/cartables/cartable-model';
import { environment } from '../../../environments/environment'; 


@Injectable({
  providedIn: 'root'
})
export class CartableService {
  private _http: HttpClient; 

  private _controllerPath: string = `${environment.baseUrl}${ApiPath.Cartable}`;

  constructor(http: HttpClient) {
    this._http = http; 
  }

  GetAllData(data: CartableBaseModel) {
     
    let url = `${this._controllerPath}/Get`;

    return this._http.post<SPCartableListResponseModel>(url, data, {
     
    });
  }

  Confirm(Id: string) {
     
    let url = `${this._controllerPath}/Confirm?Id=${Id}`;

    return this._http.put<SPCartableListResponseModel>(url, {Id: Id}, {
     
    });
  }
 
  Delete(Id: string) {
     
    let url = `${this._controllerPath}/Delete?Id=${Id}`;

    return this._http.delete<SPCartableListResponseModel>(url,  {
     
    });
  }



  
  GetRequestLeaveData(Id: string) {
     
    let url = `${environment.baseUrl}${ApiPath.RequestLeave}/Get?Id=${Id}`;

    return this._http.get<any>(url, {});
  }

}
