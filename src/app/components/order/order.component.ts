import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

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

}
