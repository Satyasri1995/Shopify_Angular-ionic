import { IProduct, Product } from './product';

export interface IOrder{
  id:string;
  orders:{
    id:string
    items:{
      product:IProduct,
      quantity:number,
    }[],
    price:number
  }[];
  price:number
  createdAt:Date;
  updatedAt:Date;
}

export class Order implements IOrder{
  id:string;
  orders:{
    id:string
    items:{
      product:IProduct,
      quantity:number,
    }[],
    price:number
  }[];
  price:number
  createdAt:Date;
  updatedAt:Date;
  constructor(data?:IOrder){
    this.id=data?.id||"";
    this.orders= data?.orders.map((order) => ({
      id:order.id,
      items: order.items.map((oitem) => ({
        product: new Product(oitem.product),
        quantity: oitem.quantity,
      })),
      price: order.price,
    }))||[];
    this.createdAt=data?.createdAt;
    this.updatedAt=data?.updatedAt;
  }
}
