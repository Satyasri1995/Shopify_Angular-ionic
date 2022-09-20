import { FavoriteProductsSelector, IsAdminSelector } from './../../store/selectors';
import { IProduct } from './../../models/product';
import { Observable } from 'rxjs';
import { AppState } from './../../store/reducer';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Logout } from 'src/app/store/actions';
import { CartProductsSelector } from 'src/app/store/selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-shopify',
  templateUrl: './shopify.page.html',
  styleUrls: ['./shopify.page.scss'],
})
export class ShopifyPage implements OnInit {
  constructor(
    private readonly alert: AlertController,
    private readonly store: Store<AppState>
  ) {}
  cartItemCount$: Observable<number>;
  favoriteItemCount$: Observable<number>;
  isAdmin$:Observable<boolean>;

  ngOnInit() {
    this.cartItemCount$ = this.store
      .select((state) => CartProductsSelector(state))
      .pipe(
        map((products: { product: IProduct; quantity: number }[]) => {
          return products.reduce((prev, current) => {
            return (prev += current.quantity);
          }, 0);
        })
      );
    this.favoriteItemCount$ = this.store
      .select((state) => FavoriteProductsSelector(state))
      .pipe(map((products: IProduct[]) => products.length));
    this.isAdmin$=this.store.select(state=>IsAdminSelector(state));
  }

  logout() {
    this.alert
      .create({
        header: 'Logout',
        subHeader: 'Are you sure want to logout ?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.store.dispatch(Logout());
            },
          },
          {
            text: 'No',
          },
        ],
      })
      .then((element: HTMLIonAlertElement) => {
        element.present();
      });
  }
}
