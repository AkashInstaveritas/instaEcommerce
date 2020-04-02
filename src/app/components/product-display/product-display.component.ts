import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {

  public subCategoryId;

  constructor
  (
    private router: Router,
    private route: ActivatedRoute,
    private productsService: ProductsService
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
    .subscribe(data => console.log(data));
  }

}
