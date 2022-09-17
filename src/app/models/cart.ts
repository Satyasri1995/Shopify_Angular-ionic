import { IProduct } from './product';

export interface ICart{
  id:string;
  products:{
    id:string,
    product:IProduct|string,
    quantity:number
  }[],
  createdAt:Date;
  updatedAt:Date;
}

export class Cart implements ICart{
  id:string;
  products:{
    id:string,
    product:IProduct|string,
    quantity:number
  }[];
  createdAt:Date;
  updatedAt:Date;
  constructor(data?:ICart){
    this.id=data?.id||"";
    this.products=data?.products||[];
    this.createdAt=data?.createdAt;
    this.updatedAt=data?.updatedAt;
  }
}
