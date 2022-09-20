import { UpdateProductComponent } from './../update-product/update-product.component';
import { AppState } from 'src/app/store/reducer';
import { UserIdSelector, CartIdSelector } from './../../store/selectors';
import { Subscription } from 'rxjs';
import { AlertController, ModalController } from '@ionic/angular';
import { DeleteProduct, SelectProduct, AddCart, AddFavorite, AddOrder, CancelOrder, RemoveFromFavorite, RemoveFromCart } from './../../store/actions';
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
  cartIdSub:Subscription;
  userId: string;
  cartId:string;
  constructor(
    private readonly store: Store<AppState>,
    private readonly alert: AlertController,
    private readonly modal:ModalController
  ) {
  }

  ngOnInit() {
    this.UserIdSub = this.store
      .select((state) => UserIdSelector(state))
      .subscribe((userId: string) => {
        this.userId = userId;
      });
    this.cartIdSub = this.store.select(state=>CartIdSelector(state)).subscribe((cartId:string)=>{
      this.cartId=cartId;
    })
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

  async updateProduct() {
    this.store.dispatch(SelectProduct({ product: this.product }));
    const modelElem = await this.modal.create({
      component:UpdateProductComponent,
      canDismiss:true,
      backdropDismiss:true,
      cssClass:'productModal'
    });
    modelElem.present();
  }





  addToCart(){
    this.store.dispatch(AddCart({userId:this.userId,cartId:this.cartId,productId:this.product.id}));
  }

  addToCartFromFavorites(){
    this.store.dispatch(AddCart({userId:this.userId,cartId:this.cartId,productId:this.product.id}));
    this.store.dispatch(RemoveFromFavorite({userId:this.userId,productId:this.product.id}))
  }

  async removeFromCart(){
    const alertElem = await this.alert.create({
      header:'Confirmation',
      message:`Are you sure ? Do you want to remove ${this.product.name} from cart ?`,
      buttons:[
        {
          text:'Yes',
          handler:()=>{
            this.store.dispatch(RemoveFromCart({userId:this.userId,cartId:this.cartId,productId:this.product.id}));
          }
        },
        {
          text:'No'
        }
      ]
    });
    await alertElem.present();
  }

  addToFavorites(){
    this.store.dispatch(AddFavorite({userId:this.userId,productId:this.product.id}));
  }

  removeFromFavorites(){
    this.store.dispatch(RemoveFromFavorite({userId:this.userId,productId:this.product.id}))
  }

  ngOnDestroy(): void {
    this.UserIdSub?.unsubscribe();
    this.cartIdSub?.unsubscribe();
  }
}
