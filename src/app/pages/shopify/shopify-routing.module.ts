import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopifyPage } from './shopify.page';

const routes: Routes = [
  {
    path:'',
    redirectTo:'shop',
    pathMatch:'full'
  },
  {
    path: '',
    component: ShopifyPage,
    children:[
      {
        path: 'shop',
        loadChildren: () => import('./../../pages/shop/shop.module').then( m => m.ShopPageModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('./../../pages/cart/cart.module').then( m => m.CartPageModule)
      },
      {
        path: 'favorites',
        loadChildren: () => import('./../../pages/favorites/favorites.module').then( m => m.FavoritesPageModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./../../pages/orders/orders.module').then( m => m.OrdersPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopifyPageRoutingModule {}
