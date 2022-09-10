import { ProductComponent } from './../../widgets/product/product.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopifyPageRoutingModule } from './shopify-routing.module';

import { ShopifyPage } from './shopify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopifyPageRoutingModule
  ],
  declarations: [ShopifyPage],
})
export class ShopifyPageModule {}
