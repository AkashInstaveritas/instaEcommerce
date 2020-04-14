import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http: HttpClient) { }

  private baseUrl = 'http://127.0.0.1:81/api';


  getProductFromSubCategory(id): Observable<any>
  {
    return this._http.get<any>(`${this.baseUrl}/subcategory/` + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getProductFromBrands(id, data): Observable<any>
  {
    return this._http.post<any>(`${this.baseUrl}/subcategory/filter/products/` + id, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
