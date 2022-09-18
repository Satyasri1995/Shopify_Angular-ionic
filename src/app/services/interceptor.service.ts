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

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(private readonly loading:LoadingController) {
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => this.handleHttpRequestStart(event)),
      map((event: HttpEvent<any>) => this.handleHttpResponse(event)),
      catchError((error) => this.handleHttpErrorResponse(error)),
      finalize(() => this.handleRequestCompleted())
    );
  }

  async handleHttpRequestStart(event: HttpEvent<any>){
      //start
  }

  handleRequestCompleted() {
    //complete
  }

  handleHttpErrorResponse(error: HttpErrorResponse) {
    const data=error.error;
    console.log(error);
    this.handleRequestCompleted();
    return throwError({ ...data });
  }

  handleHttpResponse(event: HttpEvent<any>): HttpEvent<any> {
    return event;
  }
}
