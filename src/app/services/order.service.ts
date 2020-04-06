import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http:HttpClient, private Token: TokenService) { }

  private baseUrl = 'http://127.0.0.1:81/api';

  placeUserOrder(data): Observable<any>
  {
    return this._http.post<any>(`${this.baseUrl}/order/place`, data, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.Token.get()}`,
        'Content-Type': 'application/json'
      })
    });
  }
}
