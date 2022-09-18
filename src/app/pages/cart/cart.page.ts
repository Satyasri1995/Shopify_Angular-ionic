import { LoadCart } from './../../store/actions';
import { CartStateSelector, UserIdSelector } from './../../store/selectors';
import { ICart } from './../../models/cart';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cart: Observable<ICart>;

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit() {
    this.cart = this.store.select((state) => CartStateSelector(state));
    this.store
      .select((state) => UserIdSelector(state))
      .pipe(
        tap((userId: string) => {
          this.store.dispatch(LoadCart({ userId }));
        })
      );
  }
}
