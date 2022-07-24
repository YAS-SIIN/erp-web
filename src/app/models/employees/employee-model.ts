import { BaseModel } from "../base-model";

 


export class EmployeeResponseModel extends BaseModel {
  data!: EmployeeModelData;
}

export class EmployeeModelData {
FirstName!: string;
LastName!: string;
EmpoloyeeNo!: string;
FatherName!: string;
NationalCode!: string;
IdentifyNo!: string;
DateOfBirth!: string;     
Gender: number = 0;
HireDate!: string;
LeaveDate!: string;
MobileNo!: string;
ImaghePath!: string;
}

  