import { BaseModel, BaseResponseModel, CartableBaseModel } from "../base-model";

  
export class RequestLeaveResponseModel extends BaseResponseModel {
  data!: RequestLeaveModelData[];
}

export class RequestLeaveModelData extends BaseModel { 
    requestDate!: string;
    requestLeaveType!: number;
    leaveType!: number;
    fromDate: string = "";
    toDate: string = "";
    timeLeaveDate: string = "";
    fromTime:  string = "";
    toTime: string = "";
    leaveDay!: number;
    leaveTime!: number;
    leaveReason!: string;
}

  
export class RequestLeaveFilterDto extends CartableBaseModel {  
}

