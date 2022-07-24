import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms'; 
import { SharedService } from '../../../services/shared/shared.service';
import { EmployeeModelData, EmployeeResponseModel } from 'src/app/models/employees/employee-model';
import { EmployeeService } from 'src/app/services/employees/employee.service';
import { HttpErrorResponse } from '@angular/common/http';
  
@Component({
  selector: 'app-validation-message',
  templateUrl: './validationmessagecomponent.component.html',
  styleUrls: ['./validationmessagecomponent.component.css']
})
export class ValidationMessageComponent implements OnInit {
  @Input() control: AbstractControl | undefined;
  @Input() fieldDisplayName: string = "";
  @Input() rules: { [key: string]: string; } = {"" : ""};

  get message(): string {
    
    return this.control?.hasError('required')
      ? `${this.fieldDisplayName} را وارد نمائید.`
      : this.control?.hasError('pattern')
      ? `${this.fieldDisplayName} را به شکل صحیح وارد نمائید.`
      : this.control?.hasError('email')
      ? `${this.fieldDisplayName} را به شکل صحیح وارد نمائید.`
      : this.control?.hasError('minlength')
      ? `${this.fieldDisplayName} باید بیشتر از  ${
          this.control?.errors?.['minlength'].required
        } کاراکتر باشد.`
      : this.control?.hasError('maxlength')
      ? `${this.fieldDisplayName} باید کمتر از  ${
          this.control?.errors?.['maxlength'].requiredLength
        } کاراکتر باشد.`
      : this.control?.hasError('min')
      ? `${this.fieldDisplayName} باید بیشتر از  ${
          this.control?.errors?.['min'].requiredLength
        } باشد.`
      : this.control?.hasError('max')
      ? `${this.fieldDisplayName} باید کمتر از  ${
          this.control?.errors?.['max'].requiredLength
        } باشد.`
      : this.hasRule()
      ? this.findRule()
      : this.control?.hasError('model')
      ? `${this.control?.errors?.['model'].messages[0]}`
      : '';
  }
  constructor() {}

  private hasRule() {
    
    return (
      this.rules &&
      Object.keys(this.control?.errors || []).some(ruleKey =>
        this.rules[ruleKey] ? true : false
      )
    );
  }

  private findRule(): string {
    
    let message = '';
    Object.keys(this.control?.errors || []).forEach(ruleKey => {
      if (this.rules[ruleKey]) {
        message += `${this.rules[ruleKey]} `;
      }
    });

    return message;
  }

  ngOnInit(): void {}
}