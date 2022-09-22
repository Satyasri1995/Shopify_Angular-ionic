import { JwtSelector } from './../store/selectors';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducer';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  jwt:string
  constructor(private readonly loading:LoadingController,private readonly store:Store<AppState>) {
    this.store.select(state=>JwtSelector(state)).subscribe((jwt:string)=>{
      this.jwt=jwt
    })
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
         Authorization: `Bearer ${this.jwt}`
      }
  });
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => this.handleHttpResponse(event)),
      catchError((error) => this.handleHttpErrorResponse(error)),
      finalize(() => this.handleRequestCompleted())
    );
  }



  handleRequestCompleted() {
    //complete
  }

  handleHttpErrorResponse(error: HttpErrorResponse) {
    const data=error.error;
    console.log(error)
    this.handleRequestCompleted();
    return throwError({ ...data });
  }

  handleHttpResponse(event: HttpEvent<any>): HttpEvent<any> {
    return event;
  }
}
