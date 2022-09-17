import { createSelector } from '@ngrx/store';
import { AppState, ShopState } from './reducer';

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
