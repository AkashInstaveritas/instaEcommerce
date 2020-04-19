import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/core/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://127.0.0.1:81/api';

  constructor
  (
    private _http: HttpClient,
    private Token: TokenService
  ) { }

  getProfile()
  {
    return this._http.get<any>(`${this.baseUrl}/profile`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.Token.get()}`
      })
    });
  }

  updateProfile(profileData )
  {
    return this._http.patch<any>(`${this.baseUrl}/profile/update`, profileData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.Token.get()}`
      })
    });
  }
}
