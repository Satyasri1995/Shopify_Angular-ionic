import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit {

  productForm:FormGroup;
  imgError:boolean=true;
  @Input() mode='create';
  constructor(private readonly fb:FormBuilder) { }

  ngOnInit() {
    this.productForm=this.fb.group({
      name:[undefined,[Validators.required]],
      price:[undefined,[Validators.required]],
      image:[undefined,[Validators.required]]
    });
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
    console.log(this.productForm.controls.image.errors);
    if(this.productForm.controls.image.errors){
      console.log(true)
    }
  }

}
