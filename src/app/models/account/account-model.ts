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
}
 
export class SessionResponseModel {
  token!: string;
  expirationTime!: Date;
}
