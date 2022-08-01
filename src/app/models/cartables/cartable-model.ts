import { BaseModel, BaseResponseModel } from "../base-model";

 


export class SPCartableListResponseModel extends BaseResponseModel {
  data!: SPCartableListModelData[];
}

export class SPCartableListModelData {
fieldCode!: string;         
requestDate!: string;
carTableId!: number;    
signTitle!: string; 
signTitleFa!: string;
tableName!: string;
formName!: string;
formNameFa!: string;
status!: number;
}

  
