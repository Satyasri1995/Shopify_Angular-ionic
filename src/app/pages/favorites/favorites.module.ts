import { ProductModule } from './../../shared/product/product.module';
import { ProductComponent } from './../../widgets/product/product.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritesPageRoutingModule } from './favorites-routing.module';

import { FavoritesPage } from './favorites.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritesPageRoutingModule,
    ProductModule
  ],
  declarations: [FavoritesPage]
})
export class FavoritesPageModule {}
