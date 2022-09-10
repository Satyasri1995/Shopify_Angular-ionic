import { ProductModule } from './../../shared/product/product.module';
import { ProductComponent } from './../../widgets/product/product.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopPageRoutingModule } from './shop-routing.module';

import { ShopPage } from './shop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopPageRoutingModule,
    ProductModule
  ],
  declarations: [ShopPage]
})
export class ShopPageModule {}
