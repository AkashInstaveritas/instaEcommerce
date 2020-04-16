import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { WishlistService } from 'src/app/wishlist/services/wishlist.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { FormBuilder, FormArray, FormControl } from '@angular/forms';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products-display',
  templateUrl: './products-display.component.html',
  styleUrls: ['./products-display.component.css']
})
export class ProductsDisplayComponent implements OnInit {

  public subCategoryId: any;
  public products: any = [];
  public filteredProducts: any = [];
  public loggedIn: boolean;
  public error: any = [];
  p: number = 1;
  q: number = 1;
  public selectedBrand: any = [];
  public filtersData: boolean = false;

  constructor
  (
    private router: Router,
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private Auth: AuthService,
    private Wishlist: WishlistService,
    private notification: NotificationService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.subCategoryId = id;

      this.getProducts();

    });
  }

  getProducts()
  {
    this.productsService.getProductFromSubCategory(this.subCategoryId)
    .subscribe(data => this.products = data)
  }

  setLoginStatus()
  {
    this.Auth.authStatus.subscribe(value => this.loggedIn = value);
  }

  /**
   * Start of code for adding product to wishlist
   * @param event
   * @param id
   */
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
   * End of code for adding product to wishlist
   */


   /**
   * Start of code for filtering products with use of filteroptions and brands
   * @param form
   * @param id
   */
  shopForm = this.fb.group({
      brand: this.fb.array([]),
      filter: this.fb.array([]),
    });

  onChangeBrand(id:string, isChecked: boolean) {
    const brandFormArray = <FormArray>this.shopForm.controls.brand;

    if(isChecked) {
      brandFormArray.push(new FormControl(id));
    } else {
      let index = brandFormArray.controls.findIndex(x => x.value == id)
      brandFormArray.removeAt(index);
    }
  }

  onChangeFilter(id:string, isChecked: boolean) {
    const filterFormArray = <FormArray>this.shopForm.controls.filter;

    if(isChecked) {
      filterFormArray.push(new FormControl(id));
    } else {
      let index = filterFormArray.controls.findIndex(x => x.value == id)
      filterFormArray.removeAt(index);
    }
  }

  onApplyFilter(id)
  {
    if((this.shopForm.get('filter').value.length) > 0  || (this.shopForm.get('brand').value.length) > 0)
    {
      this.productsService.getProductFromBrands(id, this.shopForm.value)
        .subscribe(data => this.filteredProducts = data);

        this.filtersData = true;
    }
    else
    {
      this.getProducts();
      this.filtersData = false;
    }
  }

  /**
   * End of code for filtering products with use of filteroptions and brands
   */
}
