import { IProduct } from './product';

export interface ICart{
  id:string;
  products:{
    product:IProduct,
    quantity:number
  }[],
  createdAt:Date;
  updatedAt:Date;
}

export class Cart implements ICart{
  id:string;
  products:{
    product:IProduct,
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
