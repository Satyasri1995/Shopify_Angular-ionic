import { StorageService } from './../services/storage.service';
import { Favorite } from './../models/favorite';
import { IOrder } from './../models/order';
import { User, IUser } from './../models/user';
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
  AutoLogin,
  Logout,
  ClearDB,
} from './actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { from, identity, of } from 'rxjs';
import { Order } from '../models/order';
import { Cart } from '../models/cart';

@Injectable()
export class AppEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly http: HttpClient,
    private readonly toast: ToastController,
    private readonly router: Router,
    private readonly storage: StorageService
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
                header: 'Status',
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

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(Logout),
      mergeMap(() => {
        return [
          SetUser({ user: new User() }),
          ClearDB(),
          RedirectTo({ page: '' }),
        ];
      })
    );
  });

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AutoLogin),
      tap(async () => {
        await this.storage.init();
      }),
      switchMap(() => {
        return from(this.storage.get('user')).pipe(
          map((userString) => {
            if (userString) {
              return JSON.parse(userString);
            }
            return {};
          }),
          map((user) => {
            if (user.id) {
              return [SetUser({ user }), RedirectTo({ page: '/shopify' })];
            }
            return [];
          }),
          mergeMap((actions) => {
            return actions;
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
      switchMap((_) => {
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
                  header: 'Status',
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
                  header: 'Status',
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
                  header: 'Status',
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
        return this.http
          .get(environment.api + `orders/add/${payload.userId}`)
          .pipe(
            mergeMap((response: any) => {
              return [
                Toast({
                  header: 'Status',
                  message: response.data,
                  severity: 'success',
                }),
                LoadOrder({ userId: payload.userId }),
                LoadCart({userId:payload.userId})
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
        const order = payload.orderId;
        return this.http
          .post(environment.api + 'orders/remove', { user, order })
          .pipe(
            mergeMap((response: any) => {
              return [
                Toast({
                  header: 'Status',
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
                  header: 'Status',
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
                  header: 'Status',
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
        const cart = payload.cartId;
        return this.http
          .post(environment.api + 'cart/add', { user, product, cart })
          .pipe(
            mergeMap((response: any) => {
              return [
                Toast({
                  header: 'Status',
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
        const cart = payload.cartId;
        return this.http
          .post(environment.api + 'cart/remove', { user, product, cart })
          .pipe(
            mergeMap((response: any) => {
              return [
                Toast({
                  header: 'Status',
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

  storeUser$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SetUser),
        tap((payload) => {
          const user = payload.user;
          const userString = JSON.stringify(user);
          this.storage.set('user', userString);
        })
      );
    },
    { dispatch: false }
  );

  clearDB$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ClearDB),
        tap(async () => {
          await this.storage.clear();
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
