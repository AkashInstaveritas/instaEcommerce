import { Component, OnInit } from '@angular/core';
import { ProductDetailService } from 'src/app/product-detail.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public featuredProducts: any = [];
  public loggedIn: boolean;
  public error: any = [];

  constructor
  (
    private products: ProductDetailService,
    private Wishlist: WishlistService,
    private notification: NotificationService,
    private Auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.getFeaturedProducts();

  }

  getFeaturedProducts()
  {
    this.products.getFeaturedProducts()
    .subscribe(data => this.featuredProducts = data);
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
