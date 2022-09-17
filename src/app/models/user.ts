export interface IUser{
  id:string;
  mail:string;
  isAdmin:boolean;
}

export class User implements IUser {
  id:string;
  mail:string;
  isAdmin:boolean;
  constructor(data?:IUser){
    this.id=data?.id;
    this.mail=data?.mail;
    this.isAdmin=data?.isAdmin||false
  }
}
