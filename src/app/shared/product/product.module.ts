import { ReactiveFormsModule } from '@angular/forms';
import { UpdateProductComponent } from './../../widgets/update-product/update-product.component';
import { IonicModule } from '@ionic/angular';
import { ProductComponent } from './../../widgets/product/product.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [ProductComponent,UpdateProductComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule.forRoot()
  ],
  exports:[ProductComponent]
})
export class ProductModule { }
