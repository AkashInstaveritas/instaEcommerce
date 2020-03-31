import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ProductDetailService } from 'src/app/product-detail.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private route:ActivatedRoute,  private _productDetailService: ProductDetailService) { }

  public productId;
  public product;

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
      // console.log(this.product);
    })

  }

}
