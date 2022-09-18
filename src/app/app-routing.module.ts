import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/signin',
    pathMatch: 'full'
  },
  {
    path: 'shopify',
    canActivate:[AuthGuard],
    loadChildren: () => import('./pages/shopify/shopify.module').then( m => m.ShopifyPageModule)
  },
  {
    path: 'auth/:type',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
