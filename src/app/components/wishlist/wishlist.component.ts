import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/services/wishlist.service';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor
  (
    private _wishlist: WishlistService,
    private notification: NotificationService
  ) { }

  public wishlists: any = [];
  showMsg: boolean = false;


  ngOnInit(): void {
    this.getWishlist();
  }

  getWishlist()
  {
    this._wishlist.getWishlist()
    .subscribe(data => this.wishlists = data);
  }

  removeProduct(event: MouseEvent, id)
  {
    event.preventDefault();

    this._wishlist.removeProductFromWishlist(id)
    .subscribe(data => {
      this.notification.showSuccess('Product removed from wishlist!', 'Success!'),
      this.getWishlist()
    });
  }

}
