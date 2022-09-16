import { Favorite } from './../models/favorite';
import { Order } from './../models/order';
import { createReducer } from "@ngrx/store";
import { Cart } from "../models/cart";
import { User } from "../models/user";

const initialState={
  user:new User(),
  products:[],
  cart:new Cart(),
  orders:new Order(),
  favorites:new Favorite()
}

export const AppReducer = createReducer(
  initialState
)
