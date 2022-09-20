import { SelectProduct, LoadProducts, LoadFavorites, LoadCart, LoadOrder } from './../../store/actions';
import {
  ProductsSelector,
  IsAdminSelector,
  UserIdSelector,
} from './../../store/selectors';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IProduct, Product } from 'src/app/models/product';
import { AppState } from 'src/app/store/reducer';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit, OnDestroy {
  products$: Observable<IProduct[]>;
  isAdmin$: Observable<boolean>;
  userIdSub: Subscription;
  userId: string;

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit() {
    this.products$ = this.store.select((state) => ProductsSelector(state));
    this.isAdmin$ = this.store.select((state) => IsAdminSelector(state));
    this.store.dispatch(LoadProducts());
    this.userIdSub = this.store
      .select((state) => UserIdSelector(state))
      .subscribe((userId: string) => {
        this.userId = userId;
       if(userId){
        this.store.dispatch(LoadFavorites({userId}));
        this.store.dispatch(LoadCart({userId}));
        this.store.dispatch(LoadOrder({userId}));
       }
      });
  }

  createProduct() {
    this.store.dispatch(SelectProduct({ product: new Product() }));
  }

  ngOnDestroy(): void {
    this.userIdSub?.unsubscribe();
  }
}
