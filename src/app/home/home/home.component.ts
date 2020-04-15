import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AuthService } from 'src/app/services/auth.service';
import { LandingService } from '../services/landing.service';

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
    private products: LandingService,
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
      this.products.addFeaturedProductToWishlist(id)
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
