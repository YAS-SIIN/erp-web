import { BaseModel, BaseResponseModel, CartableBaseModel } from "../base-model";

  
export class RequestLeaveResponseModel extends BaseResponseModel {
  data!: RequestLeaveModelData[];
}

export class RequestLeaveModelData extends BaseModel { 
    requestDate!: string;
    requestLeaveType!: Number;
    leaveType!: Number;
    fromDate: string = "";
    toDate: string = "";
    timeLeaveDate: string = "";
    fromTime:  string = "";
    toTime: string = "";
    leaveDay!: Number;
    leaveTime!: Number;
    leaveReason!: string;
}

  
export class RequestLeaveFilterDto extends CartableBaseModel {  
}

