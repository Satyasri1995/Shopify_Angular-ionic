import { SelectedProductSelector } from './../../store/selectors';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/reducer';
import { AddProduct, UpdateProduct, SelectProduct } from './../../store/actions';
import { Store } from '@ngrx/store';
import { Product, IProduct } from 'src/app/models/product';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit,OnDestroy {

  productForm:FormGroup;
  imgError:boolean=true;
  @Input() mode='create';
  selectedProduct:IProduct;
  SelectProductSub:Subscription;
  constructor(private readonly fb:FormBuilder,private readonly store:Store<AppState>) { }

  ngOnInit() {
    this.productForm=this.fb.group({
      name:[undefined,[Validators.required]],
      description:[undefined,Validators.required],
      price:[undefined,[Validators.required]],
      image:[undefined,[Validators.required]]
    });
    this.SelectProductSub=this.store.select(state=>SelectedProductSelector(state)).subscribe((product:IProduct)=>{
      this.selectedProduct=product;
      this.productForm.setValue({
        name:product.name,
        description:product.description,
        price:product.price,
        image:product.image
      });
    })
  }

  ionError(){
    this.imgError=true;
    this.productForm.controls.image.setErrors({
      ...this.productForm.controls.image.errors,
      imageError:true
    })
  }

  ionImgDidLoad(){
    this.imgError=false;
  }

  submit(){
    const product = new Product(this.productForm.value);
    product.id=this.selectedProduct.id;
    if(!product.id){
      this.store.dispatch(AddProduct({product}));
    }else{
      this.store.dispatch(UpdateProduct({product}));
    }
  }

  ngOnDestroy(): void {
      this.SelectProductSub?.unsubscribe();
  }

}
