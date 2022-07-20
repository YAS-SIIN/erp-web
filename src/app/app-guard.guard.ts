import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AccountService } from "./services/account/account.service";

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate, CanActivateChild {
  _accountService: AccountService;
  _router: Router;

  constructor(accountService: AccountService, router: Router) {
    this._accountService = accountService;
    this._router = router;
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    var isAuthenticated = this._accountService.IsAuthenticated();

    if (!isAuthenticated) {
      this._router.navigate(['/login']);
    }

    return true;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    var isAuthenticated = this._accountService.IsAuthenticated();

    if (!isAuthenticated) {
      this._router.navigate(['/login']);
    }

    return true;
  }

}
