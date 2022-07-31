export class BaseResponseModel {
  error!: string;
  meta!: string;
}

export class BaseModel {
  id: number = 0;
  status: number = 0;
  description: string = '';
}


export class CartableBaseModel {
  year: number = 0;
  status: number = 2; 
}
