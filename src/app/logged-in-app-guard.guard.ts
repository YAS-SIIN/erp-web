import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AccountService } from "./services/account/account.service";

@Injectable({
  providedIn: 'root'
})
export class LoggedInAppGuard implements CanActivate {
  _accountService: AccountService;
  _router: Router;

  constructor(accountService: AccountService, router: Router) {
    this._accountService = accountService;
    this._router = router;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this._accountService.IsAuthenticated()) {
      this._router.navigate(['/dashboard'])
      return false
    } else {
      return true
    }
  }
}
