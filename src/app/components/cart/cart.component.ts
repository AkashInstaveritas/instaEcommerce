import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public carts: any = [];

  constructor
  (
    private _cart: CartService,
    private notification: NotificationService
  ) { }


  ngOnInit(): void {
    this.getCart();
  }

  getCart()
  {
    this._cart.getCart()
    .subscribe(data => this.carts = data);
  }

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
    this.notification.showError(error.error.errors.quantity, 'Error!');
    this.getCart();
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

}
