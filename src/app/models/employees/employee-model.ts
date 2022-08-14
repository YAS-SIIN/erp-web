import { BaseModel, BaseResponseModel } from "../base-model";

 


export class EmployeeResponseModel extends BaseResponseModel {
  data!: EmployeeModelData[];
}

export class EmployeeModelData extends BaseModel {
firstName!: string;
lastName!: string;
empoloyeeNo!: string;
fatherName!: string;
nationalCode!: string;
identifyNo!: string;
dateOfBirth!: string;     
gender: number = 0;
hireDate!: string;
leaveDate!: string;
mobileNo!: string;
imaghePath!: string; 
}
