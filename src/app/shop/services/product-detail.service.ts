import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';




@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {


  constructor(private http:HttpClient, private Token: TokenService) { }

  baseUrl = "http://127.0.0.1:81/api";

  getProductDetail(id)
  {
    return this.http.get(`${this.baseUrl}/product/` + id);
  }

  addProductReview(reviewData): Observable<any>
  {
    return this.http.post<any>(`${this.baseUrl}/product/review`, reviewData, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.Token.get()}`,
        'Content-Type': 'application/json'
      })
    });
  }
}
