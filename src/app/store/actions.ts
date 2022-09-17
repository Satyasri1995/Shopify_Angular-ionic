import { IOrder } from './../models/order';
import { IUser } from './../models/user';
import { createAction, props } from '@ngrx/store';
import { IProduct } from '../models/product';

export const SignIn = createAction(
  '[auth] login user',
  props<{ mail: string; password: string }>()
);

export const SignUp = createAction(
  '[auth] user signup',
  props<{ mail: string; password: string; isAdmin: boolean }>()
);

export const RedirectTo = createAction(
  '[redirect] Redirect tthe page',
  props<{ page: string }>()
);

export const SetUser = createAction(
  '[user] sets the user in state',
  props<{ user: IUser }>()
);

export const Toast = createAction(
  '[toast] shows toast messages in ui',
  props<{ message: string; severity: string; header: string }>()
);

export const LoadProducts = createAction('[products] loads all the products');

export const SetProducts = createAction(
  '[products] sets the products in state',
  props<{ products: IProduct[] }>()
);

export const SelectProduct = createAction(
  '[product] selects the product',
  props<{ product: IProduct }>()
);

export const ClearProduct = createAction(
  '[product] Clears the selected product'
);

export const UpdateProduct = createAction(
  '[product] Updates the product',
  props<{ product: IProduct }>()
);

export const DeleteProduct = createAction(
  '[product] Deletes the product',
  props<{ productId: string }>()
);

export const AddProduct = createAction(
  '[product] creates a new product',
  props<{ product: IProduct }>()
);

export const LoadOrder = createAction(
  '[Order] loads order',
  props<{ userId: string }>()
);

export const AddOrder = createAction(
  '[order] creates new order',
  props<{ userId: string; cartId: string; productId: string }>()
);

export const CancelOrder = createAction(
  '[order] cancels the order',
  props<{ userId: string; cartId: string; productId: string }>()
);

export const SetOrder = createAction(
  '[order] sets the order in state',
  props<{ order: IOrder }>()
);

export const LoadFavorites = createAction(
  '[favorites] load favorites',
  props<{userId:string}>()
)
