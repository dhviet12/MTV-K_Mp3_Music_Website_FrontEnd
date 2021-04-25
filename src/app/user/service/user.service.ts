import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUser} from '../model/IUser';
import {Observable} from 'rxjs';

const URL_USER_CONTROLLER = 'http://localhost:8080/user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  user: IUser = {
    id: 0,
    username: '',
    password: '',
    fullName: '',
    address: '',
    email: '',
    phone: '',
    avatar: ''
  };

  getUserByID(id: number): Observable<IUser> {
    return this.httpClient.get<IUser>(URL_USER_CONTROLLER + `profile/${id}`);
  }

  editUserProfile(id: number, user: IUser): Observable<IUser> {
    return this.httpClient.put<IUser>(URL_USER_CONTROLLER + `profile/${id}`, user);
  }

}
