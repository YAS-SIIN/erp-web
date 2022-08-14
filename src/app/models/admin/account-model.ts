import { BaseModel } from "../base-model";

 


export class LoginResponseModel extends BaseModel {
  data!: LoginModelData;
}

export class LoginModelData {
  token!: string;
  isSuccessful!: boolean;
  expirationDate!: Date;
}


export class LoginDto {
  UserName!: string;
  PassWord!: string; 
  Test!: string; 
}
 
export class SessionResponseModel extends BaseModel {
  data!: SessionModel;
}

export class SessionModel {
  token!: string;
  expirationDate!: Date;
}


export class ResetPasswordDto {
  OldPassword!: string;
  Password!: string;
  RePassword!: string; 
}

export class UsersForModalResponseModel {
  data!: UsersForModalDto[];
}

export class UsersForModalDto {
  id!: number;
  userName!: string;
  firstName!: string; 
  lastName!: string;  
}