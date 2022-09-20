import { IFavorite } from './../models/favorite';
import { IUser } from './../models/user';
import { createSelector } from '@ngrx/store';
import { AppState, ShopState } from './reducer';
import { ICart } from '../models/cart';

export const ShopSelector = (state: AppState) => state.shop;

export const ProductsSelector = createSelector(
  ShopSelector,
  (state: ShopState) => state.products
);

export const SelectedProductSelector = createSelector(
  ShopSelector,
  (state: ShopState) => state.selectedProduct
);

export const OrderStateSelector = createSelector(
  ShopSelector,
  (state: ShopState) => state.orders
);

export const UserIdSelector = createSelector(
  ShopSelector,
  (state: ShopState) => state.user.id
);

export const CartStateSelector = createSelector(
  ShopSelector,
  (state: ShopState) => state.cart
);

export const FavoriteStateSelector = createSelector(
  ShopSelector,
  (state: ShopState) => state.favorite
);

export const UserSelector = createSelector(
  ShopSelector,
  (state: ShopState) => state.user
);

export const IsAdminSelector = createSelector(
  UserSelector,
  (state: IUser) => state.isAdmin
);

export const CartIdSelector = createSelector(
  CartStateSelector,
  (state: ICart) => state.id
);

export const CartProductsSelector = createSelector(
  CartStateSelector,
  (state: ICart) => state.products
);

export const FavoriteProductsSelector = createSelector(
  FavoriteStateSelector,
  (state: IFavorite) => state.products
);
