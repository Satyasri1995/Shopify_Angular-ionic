export interface IProduct{
  id:string;
  name:string;
  price:string;
  description:string;
  image:string;
  createdAt:Date;
  updatedAt:Date;
}

export class Product implements IProduct{
  id:string;
  name:string;
  price:string;
  image:string;
  description:string;
  createdAt:Date;
  updatedAt:Date;
  constructor(data?:IProduct){
    this.id=data?.id||"";
    this.name=data?.name||"";
    this.price=data?.price||"";
    this.image=data?.image||"";
    this.description=data?.description||"";
    this.createdAt=data?.createdAt;
    this.updatedAt=data?.updatedAt;
  }
}
