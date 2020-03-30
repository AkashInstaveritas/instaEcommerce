import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RegistrationService {

  _url = 'http://127.0.0.1:81/api/register';

  constructor(private _http: HttpClient) { }

  register(userData)
  {
    return this._http.post<any>(this._url, userData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
