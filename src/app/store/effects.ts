import { Favorite } from './../models/favorite';
import { IOrder } from './../models/order';
import { User } from './../models/user';
import { environment } from './../../environments/environment';
import {
  SignUp,
  Toast,
  RedirectTo,
  SignIn,
  SetUser,
  LoadProducts,
  SetProducts,
  UpdateProduct,
  DeleteProduct,
  AddProduct,
  AddOrder,
  LoadOrder,
  SetOrder,
  CancelOrder,
  LoadFavorites,
  SetFavorite,
  AddFavorite,
  RemoveFromFavorite,
  SetCart,
  LoadCart,
  AddCart,
  RemoveFromCart,
} from './actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { of } from 'rxjs';
import { Order } from '../models/order';
import { Cart } from '../models/cart';

@Injectable()
export class AppEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly http: HttpClient,
    private readonly toast: ToastController,
    private readonly router: Router
  ) {}

  //#region auth
  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SignUp),
      switchMap((payload) => {
        return this.http.post(environment.api + 'user/signup', payload).pipe(
          mergeMap((response: any) => {
            return [
              Toast({
                header: 'SignUp',
                message: response.data,
                severity: 'success',
              }),
              RedirectTo({
                page: '/auth/signin',
              }),
            ];
          })
        );
      })
    );
  });

  signIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SignIn),
      switchMap((payload) => {
        return this.http.post(environment.api + 'user/signin', payload).pipe(
          mergeMap((payload: any) => {
            return [
              SetUser({ user: new User(payload.data) }),
              RedirectTo({ page: '/shopify' }),
            ];
          })
        );
      })
    );
  });
  //#endregion

  //#region products
  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoadProducts),
      switchMap((payload) => {
        return this.http.get(environment.api + 'product/fetchAll').pipe(
          mergeMap((response: any) => {
            const products = response.data.map((pro) => new Product(pro));
            return [SetProducts({ products })];
          })
        );
      })
    );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UpdateProduct),
      switchMap((payload) => {
        return this.http
          .post(environment.api + 'product/update', payload.product)
          .pipe(
            mergeMap((response: any) => {
              return [
                Toast({
                  header: 'Update',
                  message: response.data,
                  severity: 'success',
                }),
                LoadProducts(),
              ];
            })
          );
      })
    );
  });

  addProduct = createEffect(() => {
    return this.actions$.pipe(
      ofType(AddProduct),
      switchMap((payload) => {
        return this.http
          .post(environment.api + 'product/create', payload.product)
          .pipe(
            mergeMap((response: any) => {
              return [
                Toast({
                  header: 'create',
                  message: response.data,
                  severity: 'success',
                }),
                LoadProducts(),
              ];
            })
          );
      })
    );
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DeleteProduct),
      switchMap((payload) => {
        return this.http
          .get(environment.api + `product/delete/${payload.productId}`)
          .pipe(
            mergeMap((response: any) => {
              return [
                Toast({
                  header: 'Delete',
                  message: response.data,
                  severity: 'success',
                }),
                LoadProducts(),
              ];
            })
          );
      })
    );
  });
  //#endregion

  //#region order

  addOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AddOrder),
      switchMap((payload) => {
        const user = payload.userId;
        const cart = payload.cartId;
        const product = payload.productId;
        return this.http
          .post(environment.api + 'orders/add', { user, cart, product })
          .pipe(
            mergeMap((response: any) => {
              return [
                Toast({
                  header: 'Order',
                  message: response.data,
                  severity: 'success',
                }),
                LoadOrder({ userId: payload.userId }),
              ];
            })
          );
      })
    );
  });

  loadOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoadOrder),
      switchMap((payload) => {
        return this.http
          .get(environment.api + `orders/fetchCart/${payload.userId}`)
          .pipe(
            map((response: any) => {
              return new Order(response.data);
            }),
            mergeMap((order: IOrder) => {
              return [SetOrder({ order })];
            })
          );
      })
    );
  });

  cancelOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CancelOrder),
      switchMap((payload) => {
        const user = payload.userId;
        const cart = payload.cartId;
        const product = payload.productId;
        return this.http
          .post(environment.api + 'orders/remove', { user, cart, product })
          .pipe(
            mergeMap((response: any) => {
              return [
                Toast({
                  header: 'Order',
                  message: response.data,
                  severity: 'success',
                }),
                LoadOrder({ userId: user }),
              ];
            })
          );
      })
    );
  });

  //#endregion

  //#region favorites

  loadFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoadFavorites),
      switchMap((payload) => {
        return this.http
          .get(environment.api + `wishlist/fethWishlist/${payload.userId}`)
          .pipe(
            mergeMap((response: any) => {
              return [SetFavorite({ favorite: new Favorite(response.data) })];
            })
          );
      })
    );
  });

  addFavorite$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AddFavorite),
      switchMap((payload) => {
        const user = payload.userId;
        const product = payload.productId;
        return this.http
          .post(environment.api + 'wishlist/add', { user, product })
          .pipe(
            mergeMap((response: any) => {
              return [
                Toast({
                  header: 'favorite',
                  message: response.data,
                  severity: 'success',
                }),
                LoadFavorites({ userId: payload.userId }),
              ];
            })
          );
      })
    );
  });

  removeFavorite = createEffect(() => {
    return this.actions$.pipe(
      ofType(RemoveFromFavorite),
      switchMap((payload) => {
        const user = payload.userId;
        const product = payload.productId;
        return this.http
          .post(environment.api + 'wishlist/remove', { user, product })
          .pipe(
            mergeMap((response: any) => {
              return [
                Toast({
                  header: 'favorite',
                  message: response.data,
                  severity: 'success',
                }),
                LoadFavorites({ userId: payload.userId }),
              ];
            })
          );
      })
    );
  });

  //#endregion

  //#region cart

  loadCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoadCart),
      switchMap((payload) => {
        return this.http
          .get(environment.api + `cart/fetchCart/${payload.userId}`)
          .pipe(
            mergeMap((response: any) => {
              return [SetCart({ cart: new Cart(response.data) })];
            })
          );
      })
    );
  });

  addCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AddCart),
      switchMap((payload) => {
        const user = payload.userId;
        const product = payload.productId;
        return this.http
          .post(environment.api + 'cart/add', { user, product })
          .pipe(
            mergeMap((response: any) => {
              return [
                Toast({
                  header: 'cart',
                  message: response.data,
                  severity: 'success',
                }),
                LoadCart({ userId: payload.userId }),
              ];
            })
          );
      })
    );
  });

  removeCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RemoveFromCart),
      switchMap((payload) => {
        const user = payload.userId;
        const product = payload.productId;
        return this.http
          .post(environment.api + 'cart/remove', { user, product })
          .pipe(
            mergeMap((response: any) => {
              return [
                Toast({
                  header: 'favorite',
                  message: response.data,
                  severity: 'success',
                }),
                LoadCart({ userId: payload.userId }),
              ];
            })
          );
      })
    );
  });

  //#endregion

  //#region ui
  redirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RedirectTo),
        tap((payload) => {
          this.router.navigate([`${payload.page}`]);
        })
      );
    },
    { dispatch: false }
  );

  toast$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(Toast),
        tap(async (payload) => {
          const toastElem = await this.toast.create({
            message: payload.message,
            duration: 3000,
            header: payload.header,
            color: payload.severity,
          });
          await toastElem.present();
        })
      );
    },
    { dispatch: false }
  );
  //#endregion
}
