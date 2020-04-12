import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const tokenizedReq = req.clone({
    //   setHeaders: { Authorization: `${this.authService.JWT_TOKEN} ${this.authService.getToken()}` }
    // });
    const token = localStorage.getItem('JWT_TOKEN');
    const tokenizedReq = req.clone({
      headers: req.headers.set('auth-token', 'Bearer ' + token)
    });
    return next.handle(tokenizedReq);
  }
}
