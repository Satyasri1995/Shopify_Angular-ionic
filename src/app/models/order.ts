import { IProduct } from './product';

export interface IOrder{
  id:string;
  items:{
    id:string,
    product:IProduct|string,
    quantity:number,
    totalPrice:number
  }[];
  createdAt:Date;
  updatedAt:Date;
}

export class Order implements IOrder{
  id:string;
  items:{
    id:string,
    product:IProduct|string,
    quantity:number,
    totalPrice:number
  }[];
  createdAt:Date;
  updatedAt:Date;
  constructor(data?:IOrder){
    this.id=data?.id||"";
    this.items=data?.items||[],
    this.createdAt=data?.createdAt;
    this.updatedAt=data?.updatedAt;
  }
}
