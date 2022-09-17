import { AppState } from 'src/app/store/reducer';
import { UserIdSelector } from './../../store/selectors';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { DeleteProduct, SelectProduct } from './../../store/actions';
import { Store } from '@ngrx/store';
import { IProduct, Product } from 'src/app/models/product';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  @Input() mode = 'shop';
  @Input() product: IProduct;
  @Input() quantity: number;
  UserIdSub: Subscription;
  userId: string;
  constructor(
    private readonly store: Store<AppState>,
    private readonly alert: AlertController
  ) {
    this.product = new Product();
  }

  ngOnInit() {
    this.UserIdSub = this.store
      .select((state) => UserIdSelector(state))
      .subscribe((userId: string) => {
        this.userId = userId;
      });
  }

  async deleteProduct() {
    const alertElem = await this.alert.create({
      header: 'Delete',
      message: 'Are you sure want to delete Product',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.store.dispatch(DeleteProduct({ productId: this.product.id }));
          },
        },
        {
          text: 'No',
        },
      ],
    });
    await alertElem.present();
  }

  updateProduct() {
    this.store.dispatch(SelectProduct({ product: this.product }));
  }

  cancelOrder(){

  }

  ngOnDestroy(): void {
    this.UserIdSub?.unsubscribe();
  }
}
