import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from '../service/tokenstorage.service';
import {AuthenService} from '../service/authen.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private token: TokenStorageService, private authenService: AuthenService) {
  }

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     let authReq = request;
//     const token = this.token.getToken();
//     if (token != null) {
//
//       authReq = request.clone({headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
//     }
//     return next.handle(authReq);
//   }
// }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authenService.currentUserValue;
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }
    return next.handle(request);
  }

}



// export const authInterceptorProviders = [
//   {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
// ];
