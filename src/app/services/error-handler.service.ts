import { Store } from '@ngrx/store';
import { Injectable, ErrorHandler } from '@angular/core';
import { Toast } from '../store/actions';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor(private readonly store:Store) { }
  handleError(error: any): void {
    console.log(error)
    if(error.error){
      this.store.dispatch(Toast({header:error.error,message:error.message.join(" , "),severity:'danger'}));
    }else{
      this.store.dispatch(Toast({header:'Oops!',message:'Something went wrong',severity:'danger'}));
    }
  }

}
