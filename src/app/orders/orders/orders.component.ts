import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { OrderService } from '../services/order.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public orders: any = [];

  constructor
  (
    private orderService: OrderService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders()
  {
    this.orderService.getUserOrders()
    .subscribe(data => this.orders = data);
  }

  cancelOrder(event: MouseEvent, id)
  {
    event.preventDefault();

    //console.log(id);
    this.orderService.cancelUserOrder(id)
    .subscribe(data => {
      this.notification.showSuccess(data.message, 'Success!'),
      this.getOrders()
    });
  }

}
