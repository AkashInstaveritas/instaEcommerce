import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserAddressComponent } from './components/user-address/user-address.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDisplayComponent } from './components/product-display/product-display.component';
import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderComponent } from './components/order/order.component';


const routes: Routes = [
  {path: 'logIn', component: RegistrationComponent, canActivate: [BeforeLoginService]},
  {path: 'product-detail/:id', component: ProductDetailComponent},
  {path: 'wishlist', component: WishlistComponent, canActivate: [AfterLoginService]},
  {path: 'cart', component: CartComponent, canActivate: [AfterLoginService]},
  {path: 'checkout', component: CheckoutComponent , canActivate: [AfterLoginService]},
  {path: 'orders', component: OrderComponent , canActivate: [AfterLoginService]},
  {path: 'products/:id', component: ProductDisplayComponent},
  {path: 'my-profile', component: UserProfileComponent, canActivate: [AfterLoginService]},
  {path: 'my-addresses', component: UserAddressComponent, canActivate: [AfterLoginService]},
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
  WishlistComponent,
  CheckoutComponent
];
