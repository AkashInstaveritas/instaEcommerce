import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { AuthService } from 'src/app/services/auth.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {

  public subCategoryId;
  public products: any = [];
  public loggedIn: boolean;
  public error: any = [];
  p: number = 1;

  constructor
  (
    private router: Router,
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private Auth: AuthService,
    private Wishlist: WishlistService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.subCategoryId = id;

      this.getProducts();

    });
  }

  getProducts()
  {
    this.productsService.getProductFromSubCategory(this.subCategoryId)
    .subscribe(data => this.products = data)
    // .subscribe(data => console.log(data.data.filters[0].filterOptions));
  }

  setLoginStatus()
  {
    this.Auth.authStatus.subscribe(value => this.loggedIn = value);
  }

  addProductWishlist(event: MouseEvent, id)
  {
    event.preventDefault();

    this.setLoginStatus();

    if(this.loggedIn == true)
    {
      this.Wishlist.addProductToWishlist(id)
      .subscribe(
        data => this.notification.showSuccess('Product added to wishlist!', 'Success!'),
        error => this.handleWishlistError(error),
      )
    }
    else
    {
      this.notification.showInfo('For adding selected product to wishlist!', 'LogIn!');

    }
  }

  handleWishlistError(error)
  {
    this.notification.showError(error.error.errors.product_id, 'Error!')
  }

}
