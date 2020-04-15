import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDisplayComponent } from './components/products/product-display/product-display.component';
import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AddressModule } from './address/address.module';
import { OrdersModule } from './orders/orders.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { HomeModule } from './home/home.module';



const routes: Routes = [
  {path: '', redirectTo:'/home', pathMatch:'full'},
  {path: 'home', loadChildren: () => HomeModule},
  {path: 'logIn', component: RegistrationComponent, canActivate: [BeforeLoginService]},
  {path: 'product-detail/:id', component: ProductDetailComponent},
  {path: 'wishlist', loadChildren:'./wishlist/wishlist.module#WishlistModule', canActivate: [AfterLoginService]},
  {path: 'cart', component: CartComponent, canActivate: [AfterLoginService]},
  {path: 'checkout', component: CheckoutComponent , canActivate: [AfterLoginService]},
  {path: 'orders', loadChildren: './orders/orders.module#OrdersModule' , canActivate: [AfterLoginService]},
  {path: 'products/:id', component: ProductDisplayComponent},
  {path: 'addresses', loadChildren: './address/address.module#AddressModule', canActivate: [AfterLoginService]},
  {path: 'my-profile', component: UserProfileComponent, canActivate: [AfterLoginService]},
  {path: 'request-password-reset', component: RequestResetComponent, canActivate: [BeforeLoginService]},
  {path: 'response-password-reset', component: ResponseResetComponent, canActivate: [BeforeLoginService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  RegistrationComponent,
  ProductDetailComponent,
  UserProfileComponent,
  ProductDisplayComponent,
  CartComponent,
  CheckoutComponent,
];
