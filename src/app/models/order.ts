import { IProduct } from './product';

export interface IOrder{
  id:string;
  products:{
    product:IProduct|string,
    quantity:number,
  }[];
  price:number
  createdAt:Date;
  updatedAt:Date;
}

export class Order implements IOrder{
  id:string;
  products:{
    product:IProduct|string,
    quantity:number,
  }[];
  price:number
  createdAt:Date;
  updatedAt:Date;
  constructor(data?:IOrder){
    this.id=data?.id||"";
    this.products=data?.products||[],
    this.createdAt=data?.createdAt;
    this.updatedAt=data?.updatedAt;
  }
}
