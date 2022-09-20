import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private readonly storage:Storage) {
    this.init();
  }

  async init(){
    await this.storage.create();
  }

  public set(key: string, value: any) {
    this.storage?.set(key, value);
  }

  public async get(key:string){
    return await this.storage?.get(key);
  }

  public async clear(){
    await this.storage?.clear();
  }


}
