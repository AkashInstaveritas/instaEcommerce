import { Component, OnInit } from '@angular/core';
import { ProductDetailService } from 'src/app/product-detail.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private productDetail: ProductDetailService) { }

  ngOnInit(): void {
  }

}
