export interface IUser{
  id:string;
  mail:string;
}

export class User implements IUser {
  id:string;
  mail:string;
  constructor(data?:IUser){
    this.id=data?.id;
    this.mail=data?.mail;
  }
}
