import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';
import { HomeModule } from './home/home.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { AddressModule } from './address/address.module';
import { OrdersModule } from './orders/orders.module';
import { CheckoutModule } from './checkout/checkout.module';
import { CartModule } from './cart/cart.module';
import { UserModule } from './user/user.module';




const routes: Routes = [
  {path: '', redirectTo:'/home', pathMatch:'full'},
  {path: 'home', loadChildren: () => HomeModule},
  {path: 'wishlist', loadChildren: './wishlist/wishlist.module#WishlistModule', canActivate: [AfterLoginService]},
  {path: 'cart', loadChildren: './cart/cart.module#CartModule', canActivate: [AfterLoginService]},
  {path: 'checkout', loadChildren: './checkout/checkout.module#CheckoutModule', canActivate: [AfterLoginService]},
  {path: 'orders', loadChildren: './orders/orders.module#OrdersModule' , canActivate: [AfterLoginService]},
  {path: 'addresses', loadChildren: './address/address.module#AddressModule', canActivate: [AfterLoginService]},
  {path: 'my-profile', loadChildren: './user/user.module#UserModule', canActivate: [AfterLoginService]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [

];
