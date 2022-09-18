import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Logout } from 'src/app/store/actions';

@Component({
  selector: 'app-shopify',
  templateUrl: './shopify.page.html',
  styleUrls: ['./shopify.page.scss'],
})
export class ShopifyPage implements OnInit {

  constructor(private readonly alert:AlertController,private readonly store:Store) { }

  ngOnInit() {
  }

  logout(){
    this.alert.create({
      header:'Logout',
      subHeader:'Are you sure want to logout ?',
      buttons:[
        {
          text:'Yes',
          handler:()=>{
            this.store.dispatch(Logout());
          }
        },
        {
          text:'No'
        }
      ]
    }).then((element:HTMLIonAlertElement)=>{
      element.present();
    });
  }

}
