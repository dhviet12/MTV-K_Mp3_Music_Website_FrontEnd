import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Icategory} from '../../model/icategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  getAllCate(): Observable<Icategory[]>{
    return this.http.get<Icategory[]>('http://localhost:8080/categories');
  }
}
