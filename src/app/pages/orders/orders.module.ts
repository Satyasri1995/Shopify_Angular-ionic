import { ProductModule } from './../../shared/product/product.module';
import { ProductComponent } from './../../widgets/product/product.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersPageRoutingModule } from './orders-routing.module';

import { OrdersPage } from './orders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersPageRoutingModule,
    ProductModule
  ],
  declarations: [OrdersPage]
})
export class OrdersPageModule {}
