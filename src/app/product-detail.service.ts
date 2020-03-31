import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {


  constructor(private http:HttpClient) { }

  getProductDetail(id)
  {
    return this.http.get('http://127.0.0.1:81/api/product/' + id);
  }
}
