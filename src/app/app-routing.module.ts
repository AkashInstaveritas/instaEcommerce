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


const routes: Routes = [
  {path: 'logIn', component: RegistrationComponent, canActivate: [BeforeLoginService]},
  {path: 'product-detail/:id', component: ProductDetailComponent},
  {path: 'wishlist', component: WishlistComponent, canActivate: [AfterLoginService]},
  {path: 'cart', component: CartComponent, canActivate: [AfterLoginService]},
  {path: 'products/:id', component: ProductDisplayComponent},
  {path: 'my-profile', component: UserProfileComponent, canActivate: [AfterLoginService]},
  {path: 'my-addresses', component: UserAddressComponent, canActivate: [AfterLoginService]}
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
  ProductDetailComponent
];
