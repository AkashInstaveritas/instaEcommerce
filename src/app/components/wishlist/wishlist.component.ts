import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/services/wishlist.service';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private _wishlist: WishlistService) { }

  public wishlists = [];
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
      this.showMsg= true,
      this.getWishlist()
    });
  }

}
