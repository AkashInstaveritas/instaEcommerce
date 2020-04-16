import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  public orderId: any;
  public detail: any;

  constructor
  (
    private _order: OrderService,
    private route:ActivatedRoute,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.orderId = id;
    });

    this.orderDetails();
  }

  orderDetails()
  {
    this._order.getOrderDetails(this.orderId)
    .subscribe(data => {
      this.detail = data;
    });
  }

}
