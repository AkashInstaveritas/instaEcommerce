import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsDisplayComponent } from './products-display/products-display.component';
import { ProductDetailsComponent } from './product-details/product-details.component';


const routes: Routes = [
  {path: "shop/:id",  component: ProductsDisplayComponent},
  {path: "product-detail/:id", component: ProductDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
