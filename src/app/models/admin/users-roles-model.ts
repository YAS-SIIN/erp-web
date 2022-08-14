import { BaseModel, BaseResponseModel } from "../base-model";

 
 
export class UserRoleResponseModel extends BaseResponseModel {
  data!: UserRoleModelData[];
}


export class UserRoleModelData {
  adminRole!: RoleModel;
  hasRole!: boolean;
}

export class RoleModel extends BaseModel {
  roleName!: string;
  roleNameFa!: string;
}