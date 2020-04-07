import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {


  constructor(private http:HttpClient) { }

  baseUrl = "http://127.0.0.1:81/api";

  getProductDetail(id)
  {
    return this.http.get(`${this.baseUrl}/product/` + id);
  }

  getFeaturedProducts(): Observable<any>
  {
    return this.http.get<any>(`${this.baseUrl}/products/featured`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
