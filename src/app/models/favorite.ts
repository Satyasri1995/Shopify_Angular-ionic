import { IProduct } from './product';
export interface IFavorite{
  id:string;
  products:IProduct[];
  createdAt:Date;
  updatedAt:Date;
}

export class Favorite implements IFavorite{
  id:string;
  products:IProduct[];
  createdAt:Date;
  updatedAt:Date;
  constructor(data?:IFavorite){
    this.id=data?.id||"";
    this.products=data?.products||[];
    this.createdAt=data?.createdAt;
    this.updatedAt=data?.updatedAt;
  }
}
