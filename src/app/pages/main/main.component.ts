import { NestedTreeControl } from '@angular/cdk/tree';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
import { EmployeeModelData, EmployeeResponseModel } from 'src/app/models/employees/employee-model';
import { SharedService } from 'src/app/services/shared/shared.service';
import { AccountService } from '../../services/admin/account.service';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
      },
      {
        name: 'Orange',
        children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
      },
    ],
  },
];

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  _accountService: AccountService;
  _sharedService: SharedService;
  _router: Router;
 
  accountInfo: any;

  constructor(accountService: AccountService, sharedService: SharedService, router: Router) {
    this._sharedService = sharedService;
    this._accountService = accountService;
    this.dataSource.data = TREE_DATA;
    this._router = router;
   }

   treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();
 
  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;


  ngOnInit(): void {
    this.GetAccountInfo();
  }

  Logout() {
    debugger
    this._accountService.Logout().subscribe(() => {
      localStorage.removeItem('session');
      this._router.navigate(['/login']);
    })
  }

  GetAccountInfo() {
    debugger
    this._accountService.GetAccountInfo().subscribe(
      (data: EmployeeResponseModel) => { 
       this.accountInfo = data.data;
      },
      (responseError: HttpErrorResponse) => { 
        this._sharedService.toastError('خطایی در انجام عملیات رخ داده است' + '|' + responseError.error.error.error_description, `کد خطای ${responseError.error.error.error_code}`);      
      });
  }
 
}
