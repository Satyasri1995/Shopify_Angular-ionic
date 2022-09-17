import { IUser } from './../models/user';
import { Favorite, IFavorite } from './../models/favorite';
import { IOrder, Order } from './../models/order';
import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { Cart, ICart } from '../models/cart';
import { User } from '../models/user';
import { SetUser, SetProducts, SelectProduct, ClearProduct, SetOrder, SetCart, SetFavorite } from './actions';
import { IProduct, Product } from '../models/product';

const initialState = {
  user: new User(),
  products: [],
  selectedProduct: new Product(),
  cart: new Cart(),
  orders: new Order(),
  favorite: new Favorite(),
};



export interface ShopState {
  user: IUser;
  products: IProduct[];
  selectedProduct: IProduct;
  cart: ICart;
  orders: IOrder;
  favorite: IFavorite;
}

export const ShopReducer = createReducer(
  initialState,
  on(SetUser, (state, payload) => {
    return {
      ...state,
      user: payload.user,
    };
  }),
  on(SetProducts, (state, payload) => {
    return {
      ...state,
      products: payload.products,
    };
  }),
  on(SelectProduct, (state, payload) => {
    return {
      ...state,
      selectedProduct: payload.product,
    };
  }),
  on(ClearProduct, (state, payload) => {
    return {
      ...state,
      selectedProduct: new Product(),
    };
  }),
  on(SetOrder,(state,payload)=>{
    return {
      ...state,
      orders:payload.order
    }
  }),
  on(SetCart,(state,payload)=>{
    return {
      ...state,
      cart:payload.cart
    }
  }),
  on(SetFavorite,(state,payload)=>{
    return {
      ...state,
      favorite:payload.favorite
    }
  })
);

export interface AppState {
  shop: ShopState;
}

export const AppReducer: ActionReducerMap<AppState> = {
  shop: ShopReducer
};
