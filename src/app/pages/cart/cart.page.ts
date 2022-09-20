import { LoadCart, AddOrder } from './../../store/actions';
import { CartStateSelector, UserIdSelector } from './../../store/selectors';
import { ICart } from './../../models/cart';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/store/reducer';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit,OnDestroy {
  cartSub:Subscription;
  userIdSub:Subscription;
  cart:ICart;
  userId:string;

  constructor(private readonly store:Store<AppState>){}

  ngOnInit() {
    this.cartSub=this.store.select((state) => CartStateSelector(state)).subscribe((cart:ICart)=>{
      this.cart=cart;
    });
    this.userIdSub=this.store.select((state)=>UserIdSelector(state)).subscribe((userId:string)=>{
      this.userId=userId;
      this.store.dispatch(LoadCart({userId}));
    });
  }

  placeOrder(){
    this.store.dispatch(AddOrder({userId:this.userId}));
  }

  ngOnDestroy(): void {
    this.cartSub?.unsubscribe();
    this.cartSub?.unsubscribe();
  }

}
