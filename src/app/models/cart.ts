import { IProduct } from './product';

export interface ICart{
  id:string;
  items:{
    id:string,
    product:IProduct|string,
    quantity:number
  }[],
  createdAt:Date;
  updatedAt:Date;
}

export class Cart implements ICart{
  id:string;
  items:{
    id:string,
    product:IProduct|string,
    quantity:number
  }[];
  createdAt:Date;
  updatedAt:Date;
  constructor(data?:ICart){
    this.id=data?.id||"";
    this.items=data?.items||[];
    this.createdAt=data?.createdAt;
    this.updatedAt=data?.updatedAt;
  }
}
