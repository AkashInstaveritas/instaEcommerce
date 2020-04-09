import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './components/registration/registration.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDisplayComponent } from './components/products/product-display/product-display.component';
import { UserAddressComponent } from './components/user-address/user-address.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderComponent } from './components/orders/order/order.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { OrderDetailsComponent } from './components/orders/order-details/order-details.component';


@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    RegistrationComponent,
    ProductDetailComponent,
    UserProfileComponent,
    WishlistComponent,
    CartComponent,
    ProductDisplayComponent,
    UserAddressComponent,
    RequestResetComponent,
    ResponseResetComponent,
    CheckoutComponent,
    OrderComponent,
    FooterComponent,
    HomeComponent,
    OrderDetailsComponent,

  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
