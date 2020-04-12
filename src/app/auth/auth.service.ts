import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, map } from 'rxjs/operators';
import { throwError, of, Observable, BehaviorSubject, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppError } from '../common/app-error';
import { UserExitsError } from '../common/user-exits-error';
import { WrongCredentialError } from '../common/wrong-crendential-error';
import { ActivatedRoute, Router } from '@angular/router';

interface EmailPassword {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
}

interface LoginResponse {
  id: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly BASE_URL = 'http://localhost:3000/auth';
  readonly JWT_TOKEN = 'JWT_TOKEN';
  readonly REFRESH_TOKEN  = 'REFRESH_TOKEN';
  user$: BehaviorSubject<User> = new BehaviorSubject(null);
  // user$ = new Subject<string>();

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Send the token to get the user in case the user refresh the page
    http.get(this.BASE_URL).pipe(take(1),
      catchError((error: Response) => {
        if (error.status === 401) {
          // Create User is Not Authenticated
        } else {
          return throwError(new AppError(error));
        }
      })).
    subscribe(
      user => this.user$.next( user as User ),
      error => console.log('User Not Authenticated'));
  }

  signup(emailPassword: EmailPassword) {
    return this.http.post(this.BASE_URL + '/signup', emailPassword).
      pipe(take(1),
        catchError((error: Response) => {
          if (error.status === 403) {
            return throwError(new UserExitsError());
          }
          return throwError(new AppError(error));
        }));
  }

  login(emailPassword: EmailPassword) {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';

    return this.http.post(this.BASE_URL + '/login', emailPassword).
      pipe(take(1), map((token: LoginResponse) => {
        localStorage.setItem(this.JWT_TOKEN, token.accessToken);
        localStorage.setItem(this.REFRESH_TOKEN, token.refreshToken);
        this.user$.next({ id: token.id, email: token.email });
        this.router.navigate([returnUrl]);
      }),
        catchError((error: Response) => {
          if (error.status === 403) {
            return throwError(new WrongCredentialError());
          }
          return throwError(new AppError(error));
        }));
  }

  // getToken() {
  //   return localStorage.getItem(this.JWT_TOKEN);
  // }

  refreshToken() {
    this.http.get(this.BASE_URL + 'refresh').
      pipe(take(1)).subscribe((token: { accessToken: string }) => {
        localStorage.setItem(this.JWT_TOKEN, token.accessToken);
      });
  }

  logOut() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    this.user$.next(null);
    this.router.navigate(['/']);
  }
}
