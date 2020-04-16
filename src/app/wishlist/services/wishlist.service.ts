import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _http: HttpClient, private Token: TokenService) { }

  private baseUrl = 'http://127.0.0.1:81/api';


  getWishlist(): Observable<any>
  {
    return this._http.get<any>(`${this.baseUrl}/wishlist`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.Token.get()}`
      })
    });
  }

  addProductToWishlist(id): Observable<any>
  {
    return this._http.post<any>(`${this.baseUrl}/wishlist/products`, { product_id: id }, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.Token.get()}`,
        'Content-Type': 'application/json'
      })
    });
  }

  removeProductFromWishlist(id): Observable<any>
  {
    return this._http.delete<any>(`${this.baseUrl}/wishlist/product/` + id, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.Token.get()}`
      })
    });
  }
}
