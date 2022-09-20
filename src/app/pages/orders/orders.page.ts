import { LoadOrder } from './../../store/actions';
import { AppState } from 'src/app/store/reducer';
import { OrderStateSelector, UserIdSelector } from './../../store/selectors';
import { Store } from '@ngrx/store';
import { IOrder } from './../../models/order';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  orderSub:Subscription;
  order:IOrder;

  constructor(private readonly store:Store<AppState>){}

  ngOnInit() {
    this.store.select((state) => OrderStateSelector(state)).subscribe((order:IOrder)=>{
      this.order=order;
    });
    this.orderSub=this.store.select((state)=>UserIdSelector(state)).subscribe((userId:string)=>{
      this.store.dispatch(LoadOrder({userId}));
    });
  }

  ionViewWillLeave(){
    this.orderSub?.unsubscribe();
  }
}
