import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IUserToken} from '../model/IUserToken';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {SignUpForm} from '../model/SignUpForm';

const URL_SERVER = 'http://localhost:8080/auth/';
@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  update= new EventEmitter<string>();

  // @ts-ignore
  private currentUserSubject: BehaviorSubject<IUserToken>;
  // @ts-ignore
  public currentUser: Observable<IUserToken>;


  constructor(private httpClient: HttpClient) {
    // @ts-ignore
    this.currentUserSubject= new BehaviorSubject<IUserToken>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): IUserToken {
    return this.currentUserSubject.value;
  }
  login(username: string, password: string) {
    return this.httpClient.post(URL_SERVER + 'login', {username, password})
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.update.emit('login');
        return user;
      }));
  }

  signUp(signUp: SignUpForm): Observable<any>{
    return this.httpClient.post<any>(URL_SERVER + 'signup',signUp);
  }
}
