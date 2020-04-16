import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../core/services/token.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _http:HttpClient, private Token: TokenService) { }

  private baseUrl = 'http://127.0.0.1:81/api';

  getCart(): Observable<any>
  {
    return this._http.get<any>(`${this.baseUrl}/cart`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.Token.get()}`
      })
    });
  }

  updateProductQuantity(quantity,id): Observable<any>
  {
    return this._http.patch<any>(`${this.baseUrl}/cart/product/` + id, { quantity: quantity }, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.Token.get()}`,
        'Content-Type': 'application/json'
      })
    });
  }

  removeProductFromCart(id): Observable<any>
  {
    return this._http.delete<any>(`${this.baseUrl}/cart/product/` + id, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.Token.get()}`
      })
    });
  }

  addProductToCart(cartData): Observable<any>
  {
    return this._http.post<any>(`${this.baseUrl}/cart/products`, cartData, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.Token.get()}`,
        'Content-Type': 'application/json'
      })
    });
  }

}
