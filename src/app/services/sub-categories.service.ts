import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SubCategoriesService {

  constructor(private http: HttpClient) { }

  getSubCategories(id): Observable<any>
  {
    return this.http.get<any>('http://127.0.0.1:81/api/category/' + id);
  }

}
