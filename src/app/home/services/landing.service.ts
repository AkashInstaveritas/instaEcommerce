import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/core/services/token.service';


@Injectable({
  providedIn: 'root'
})
export class LandingService {

  constructor(private http:HttpClient, private Token: TokenService) { }

  baseUrl = "http://127.0.0.1:81/api";


  getFeaturedProducts(): Observable<any>
  {
    return this.http.get<any>(`${this.baseUrl}/products/featured`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  addFeaturedProductToWishlist(id): Observable<any>
  {
    return this.http.post<any>(`${this.baseUrl}/wishlist/products`, { product_id: id }, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.Token.get()}`,
        'Content-Type': 'application/json'
      })
    });
  }

}
