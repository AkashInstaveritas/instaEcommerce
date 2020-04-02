import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ProductDetailService } from 'src/app/product-detail.service';
import { AuthService } from '../services/auth.service';
import { WishlistService } from '../services/wishlist.service';
import { NotificationService } from '../services/notification.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public productId;
  public product;
  public loggedIn: boolean;
  public showMssg: boolean;
  public errorMssg: boolean;
  public error = [];

  constructor
  (
    private route:ActivatedRoute,
    private _productDetailService: ProductDetailService,
    private Auth: AuthService,
    private Wishlist: WishlistService,
    private notification: NotificationService
  ) { }



  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.productId = id;

      this.productDetail();
    });
  }

  productDetail()
  {
    this._productDetailService.getProductDetail(this.productId)
    .subscribe(data => {
      this.product = data;
    })
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
    this.error = error.error.errors;
  }

  setLoginStatus()
  {
    this.Auth.authStatus.subscribe(value => this.loggedIn = value);
  }


}
