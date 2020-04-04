import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private _http:HttpClient, private Token: TokenService) { }

  private baseUrl = 'http://127.0.0.1:81/api';

  getUserAddresses(): Observable<any>
  {
    return this._http.get<any>(`${this.baseUrl}/addresses`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.Token.get()}`
      })
    });
  }

  getUserAddress(id): Observable<any>
  {
    return this._http.get<any>(`${this.baseUrl}/address/` + id, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.Token.get()}`
      })
    });
  }

  addUserAddress(addressData): Observable<any>
  {
    return this._http.post<any>(`${this.baseUrl}/user/address`, addressData, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.Token.get()}`,
        'Content-Type': 'application/json'
      })
    });
  }

  updateUserAddress(addressData): Observable<any>
  {
    return this._http.patch<any>(`${this.baseUrl}/address/` + addressData.id, addressData, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.Token.get()}`,
        'Content-Type': 'application/json'
      })
    });
  }

  removeUserAddress(id): Observable<any>
  {
    return this._http.delete<any>(`${this.baseUrl}/address/` + id, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.Token.get()}`
      })
    });
  }


}
