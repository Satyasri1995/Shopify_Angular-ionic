import { AppState } from 'src/app/store/reducer';
import { OrderStateSelector } from './../../store/selectors';
import { Store } from '@ngrx/store';
import { IOrder } from './../../models/order';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  order:Observable<IOrder>;

  constructor(private readonly store:Store<AppState>) { }

  ngOnInit() {
    this.order = this.store.select(state=>OrderStateSelector(state));
  }

}
