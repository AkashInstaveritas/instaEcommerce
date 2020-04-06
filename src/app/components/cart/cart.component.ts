import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor
  (
    private _cart: CartService,
    private notification: NotificationService
  ) { }

  public carts: any = [];

  ngOnInit(): void {
    this.getCart();
  }

  getCart()
  {
    this._cart.getCart()
    .subscribe(data => this.carts = data);

    var accounts = [
      { name: 'James Brown', msgCount: 123 },
      { name: 'Stevie Wonder', msgCount: 22 },
      { name: 'Sly Stone', msgCount: 16 },
      { name: 'Otis Redding', msgCount: 300 }  // Otis has the most messages
    ];

    // get sum of msgCount prop across all objects in array
    var msgTotal = this.carts.reduce(function(prev, cur) {
      return prev + cur.msgCount;
    }, 0);

    console.log('Total Messages:', msgTotal); // Total Messages: 461
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

}
