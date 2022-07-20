import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account/account.service';
import { SessionResponseModel, LoginDto } from '../../models/account/account-model'; 
import { SharedService } from '../../services/shared/shared.service';
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  _accountService: AccountService;
  _router: Router;
  _sharedService: SharedService;

  loginModel: LoginDto = new LoginDto;
  
  loginFormGroup!: FormGroup;
 
  constructor(private formBuilder: FormBuilder, accountService: AccountService, router: Router, sharedService: SharedService) {
    this._accountService = accountService;
    this._router = router;
    this._sharedService = sharedService;

    this.loginFormGroup = formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  Login() {
    debugger
   
        this._accountService.Login(this.loginModel).subscribe((data:any) => {
          let session: SessionResponseModel = data;
         
          localStorage.setItem('session', JSON.stringify(session));

          this._router.navigate(['/dashboard']);
        }, (data: any) => { 

          this._sharedService.toastError(data.error);
          // this._sharedService.OpenSnackBar(this.errorMessage = data.error.error.error_description, 'close')
        }); 
  }
}
 
