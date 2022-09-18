import { map } from 'rxjs/operators';
import { UserIdSelector } from './../store/selectors';
import { AppState } from './../store/reducer';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private readonly store:Store<AppState>){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(state=>UserIdSelector(state)).pipe(map(userId=>!!userId));
  }

}
