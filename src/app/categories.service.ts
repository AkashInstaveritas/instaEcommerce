import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategories } from './categories';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  _url = 'http://127.0.0.1:81/api/categories';

  constructor(private http:HttpClient) { }

  getCategories(): Observable<ICategories[]>{
    return this.http.get<ICategories[]>(this._url);

  }
}
