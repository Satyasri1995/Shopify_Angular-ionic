import { UserIdSelector, CartIdSelector } from './../../store/selectors';
import { Subscription } from 'rxjs';
import { CancelOrder } from './../../store/actions';
import { AlertController } from '@ionic/angular';
import { AppState } from './../../store/reducer';
import { Store } from '@ngrx/store';
import { IProduct } from './../../models/product';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-orders-item',
  templateUrl: './orders-item.component.html',
  styleUrls: ['./orders-item.component.scss'],
})
export class OrdersItemComponent implements OnInit,OnDestroy {
  constructor(private readonly store:Store<AppState>,private readonly alert:AlertController) {}

  @Input() order: {
    id: string;
    items: { product: IProduct; quantity: number }[];
    price: number;
  } = {id:"",items:[],price:0};
  userIdSub:Subscription;
  userId:string;


  ngOnInit() {
    this.userIdSub = this.store.select(state=>UserIdSelector(state)).subscribe((userId:string)=>{
      this.userId=userId;
    });
  }

  async cancelOrder(){
    const alertElem = await this.alert.create({
      header:'Cancellation',
      message:'Are you sure want to cancel this order ?',
      buttons:[
        {
          text:'Yes',
          handler:()=>{
            this.store.dispatch(CancelOrder({userId:this.userId,orderId:this.order.id}));
            console.log("CancelOrder")
          }
        },
        {
          text:'No'
        }
      ]
    });
    await alertElem.present();
  }

  ngOnDestroy(): void {
      this.userIdSub?.unsubscribe();
  }
}
