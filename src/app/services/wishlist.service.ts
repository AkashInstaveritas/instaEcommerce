import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _http: HttpClient, private Token: TokenService) { }

  _url = 'http://127.0.0.1:81/api/wishlist';

  getWishlist(): Observable<any>
  {
    return this._http.get<any>(this._url, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.Token.get()}`
      })
    });
  }
}
