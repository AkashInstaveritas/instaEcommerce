import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RegistrationService {

  private baseUrl = 'http://127.0.0.1:81/api';

  constructor(private _http: HttpClient) { }

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
}
