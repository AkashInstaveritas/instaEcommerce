import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/core/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = 'http://127.0.0.1:81/api';

  constructor
  (
    private _http: HttpClient,
    private Token: TokenService
  ) { }

  register(userData)
  {
    return this._http.post<any>(`${this.baseUrl}/register`, userData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  login(userCredentials)
  {
    return this._http.post<any>(`${this.baseUrl}/login`, userCredentials, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  sendPasswordResetLink(data)
  {
    return this._http.post<any>(`${this.baseUrl}/sendPasswordResetLink`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  resetPassword(data)
  {
    return this._http.post<any>(`${this.baseUrl}/resetPassword`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
