import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ProductDetailService } from 'src/app/product-detail.service';
import { AuthService } from '../services/auth.service';
import { WishlistService } from '../services/wishlist.service';
import { NotificationService } from '../services/notification.service';
import { CartService } from '../services/cart.service';
import { FormBuilder, Validators } from '@angular/forms';


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
  public error: any = [];

  constructor
  (
    private route:ActivatedRoute,
    private _productDetailService: ProductDetailService,
    private Auth: AuthService,
    private Wishlist: WishlistService,
    private cart: CartService,
    private notification: NotificationService,
    private fb: FormBuilder,
  ) { }



  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.productId = id;
    });

    this.productDetail();
    this.loadCartDefaultData();
  }

  productDetail()
  {
    this._productDetailService.getProductDetail(this.productId)
    .subscribe(data => {
      this.product = data;
    })
  }

  setLoginStatus()
  {
    this.Auth.authStatus.subscribe(value => this.loggedIn = value);
  }

  /**
   *  Start of adding product to wishlist
   * @param event
   * @param id
   **/

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
    this.notification.showError(error.error.errors.product_id, 'Error!')
  }

  /**
   *  End of adding product to wishlist
   **/


  addToCartForm = this.fb.group({
    quantity: ['', Validators.required],
    product_id: ['', Validators.required],
  });

  loadCartDefaultData()
  {
    this.addToCartForm.setValue({
      quantity: '1',
      product_id: this.productId,
    });
  }

  onAddToCartSubmit()
  {
    this.setLoginStatus();

    if(this.loggedIn == true)
    {
      console.log(this.addToCartForm.value);
      this.cart.addProductToCart(this.addToCartForm.value)
          .subscribe(
            data => this.notification.showSuccess(data.message, 'Success!'),
            error => this.handleAddToCartError(error),
          )
    }
    else
    {
      this.notification.showInfo('For adding selected product to cart!', 'LogIn!');
    }
  }

  handleAddToCartError(error)
  {
    if(error.error.errors.quantity)
    {
      this.notification.showError(error.error.errors.quantity, 'Error!')
    }

    this.notification.showError(error.error.errors.product_id, 'Error!')
  }




}
