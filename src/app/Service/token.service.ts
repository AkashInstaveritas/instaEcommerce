import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  handle(token)
  {
    this.set(token);
  }

  set(token)
  {
    localStorage.setItem('token', token);
  }

  get()
  {
    return localStorage.getItem('token');
  }

  remove()
  {
    return localStorage.removeItem('token');
  }

  loggedIn()
  {

    return this.get() ? true : false;

  }
}
