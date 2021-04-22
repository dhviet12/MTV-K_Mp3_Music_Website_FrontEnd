import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignUp} from '../model/signUp';
import {Observable} from 'rxjs';


const URL_SERVER = ' http://localhost:8080/auth/';
@Injectable({
  providedIn: 'root'
})
export class FormSignUpService {
  private  API_SIGNUP = URL_SERVER+'signup'

  constructor(private http:HttpClient) { }

  signUp(signUp: SignUp): Observable<any>{
    return this.http.post<any>(this.API_SIGNUP,signUp);
  }
}
