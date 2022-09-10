import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-shopify',
  templateUrl: './shopify.page.html',
  styleUrls: ['./shopify.page.scss'],
})
export class ShopifyPage implements OnInit {

  constructor(private readonly alert:AlertController) { }

  ngOnInit() {
  }

  logout(){
    this.alert.create({
      header:'Logout',
      subHeader:'Are you sure want to logout ?',
      buttons:[
        {
          text:'Yes',
          handler:()=>{}
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
