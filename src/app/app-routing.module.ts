import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';


const routes: Routes = [
  {path: 'logIn', component: RegistrationComponent},
  {path: 'product-detail/:id', component: ProductDetailComponent},
  {path: 'profile', component: UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  RegistrationComponent,
  ProductDetailComponent,
  UserProfileComponent
];
