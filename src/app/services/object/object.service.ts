import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPath } from 'src/app/apiPath';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {
  private _http: HttpClient;

  private _controllerPath: string = `${environment.baseUrl}${ApiPath.Object}`;

  constructor(http: HttpClient) {
    this._http = http;
  }

  Download(id: string) {
    let url = `${this._controllerPath}/${id}`;

    return this._http.get(url, {responseType: 'blob'}).subscribe((data) => {
      var file = new Blob([data], { type: 'application/pdf' })
      var fileURL = URL.createObjectURL(file);

      window.open(fileURL);
    });
  }

  DownloadImage(id: string) {
    let url = `${this._controllerPath}/${id}`;

    return this._http.get(url, {responseType: 'blob'}).subscribe((data) => {
      var file = new Blob([data], { type: 'image/jpeg' })
      var fileURL = URL.createObjectURL(file);

      window.open(fileURL);
    });
  }

  DownloadImageAsBlob(id: string): Observable<Blob> {
    let url = `${this._controllerPath}/${id}`;

    return this._http.get(url, {responseType: 'blob'});
  }
}
