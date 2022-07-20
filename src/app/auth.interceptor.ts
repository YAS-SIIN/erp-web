import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AccountService } from './services/account/account.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  _accountService: AccountService;

  constructor(accountService: AccountService, private router: Router) {
    this._accountService = accountService;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${this._accountService.GetToken()}`,
      },
    });

    return next.handle(req).pipe(
      catchError((response: HttpErrorResponse) => {
        if (response.status === 401) {
          localStorage.removeItem('session');
          this.router.navigate(["login"]);
        }
        return throwError(response);
      }
    ));
  }
}
