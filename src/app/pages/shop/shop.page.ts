import { SelectProduct, LoadProducts } from './../../store/actions';
import { ProductsSelector, IsAdminSelector } from './../../store/selectors';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IProduct, Product } from 'src/app/models/product';
import { AppState } from 'src/app/store/reducer';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {

  products$:Observable<IProduct[]>;
  isAdmin$:Observable<boolean>;

  constructor(private readonly store:Store<AppState>) { }

  ngOnInit() {
    this.products$ = this.store.select(state=>ProductsSelector(state));
    this.isAdmin$ = this.store.select(state=>IsAdminSelector(state));
    this.store.dispatch(LoadProducts());
  }

  createProduct(){
    this.store.dispatch(SelectProduct({product:new Product()}));

  }

}
