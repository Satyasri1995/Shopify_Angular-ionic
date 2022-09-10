import { ProductModule } from './../../shared/product/product.module';
import { ProductComponent } from './../../widgets/product/product.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartPageRoutingModule } from './cart-routing.module';

import { CartPage } from './cart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartPageRoutingModule,
    ProductModule
  ],
  declarations: [CartPage]
})
export class CartPageModule {}
