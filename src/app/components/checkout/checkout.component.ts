import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/services/address.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public addresses = [];
  public carts = [];

  constructor
  (
    private Token: TokenService,
    private Auth: AuthService,
    private router: Router,
    private address: AddressService,
    private _cart: CartService,
    private notification: NotificationService,
    private checkout: OrderService
  ) { }

  ngOnInit(): void {

    this.address.getUserAddresses()
    .subscribe(data => this.addresses = data);

    this.getCart();
  }

  logout(event: MouseEvent)
  {
    event.preventDefault();

    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    this.router.navigate(['/logIn']);
  }

  getCart()
  {
    this._cart.getCart()
    .subscribe(data => this.carts = data);
  }

  /**
   * Start of Code for cart operations in checkout page
   * @param quantity
   * @param id
   */

  changeQuantity(quantity: string, id): void {

    if(quantity != "")
    {
      this._cart.updateProductQuantity(quantity, id)
      .subscribe(data => {
        this.notification.showSuccess(data.message, 'Success!'),
        this.getCart()
      },
      error => this.handleUpdateQuantityError(error))
    }

  }

  handleUpdateQuantityError(error)
  {
    this.notification.showError(error.error.errors.quantity, 'Error!')
    this.getCart()
  }

  removeProduct(event: MouseEvent, id)
  {
    event.preventDefault();

    this._cart.removeProductFromCart(id)
    .subscribe(data => {
      this.notification.showSuccess(data.message, 'Success!'),
      this.getCart()
    })
  }

  /**
   * End of Code for cart operations in checkout page
   */

  onOrderSubmit(value: any) {

    this.checkout.placeUserOrder(value)
        .subscribe(data => this.handleOrderPlaceResponse(data),
                   error => this.handleOrderPlaceError(error));
    console.log(value);
  }

  handleOrderPlaceResponse(data)
  {
    this.notification.showSuccess(data.message, "Success!");
    this.router.navigate(['/my-profile']);
  }

  handleOrderPlaceError(error)
  {
    this.notification.showError(error.error.message, 'Error!');
    this.router.navigate(['/checkout']);
  }

}
