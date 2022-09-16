import { IProduct } from './product';
export interface IFavorite{
  id:string;
  items:{
    id:string,
    product:string|IProduct,
  }[];
  createdAt:Date;
  updatedAt:Date;
}

export class Favorite implements IFavorite{
  id:string;
  items:{
    id:string,
    product:string|IProduct,
  }[];
  createdAt:Date;
  updatedAt:Date;
  constructor(data?:IFavorite){
    this.id=data?.id||"";
    this.items=data?.items||[];
    this.createdAt=data?.createdAt;
    this.updatedAt=data?.updatedAt;
  }
}
