import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, map, tap } from 'rxjs/operators';
import { throwError, of, Observable, BehaviorSubject, Subject, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppError } from '../common/app-error';
import { UserExitsError } from '../common/user-exits-error';
import { WrongCredentialError } from '../common/wrong-crendential-error';
import { ActivatedRoute, Router } from '@angular/router';
import { UserNotAuthenticated } from '../common/user-not-authenticated';

interface EmailPassword {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  role: string;
}

interface LoginResponse {
  id: string;
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly BASE_URL = 'http://localhost:3000/auth/';
  readonly JWT_TOKEN = 'JWT_TOKEN';
  readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  // Set to Undefined to check in the Guard when refresh the page
  user$: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.getUser().subscribe(user => { this.user$.next(user as User); });
  }

  getUser() {
    return this.http.get(this.BASE_URL).pipe(
      catchError((error: Response) => {
      return of(null);
    }), map(user => {
      return user;
    }));
  }

  signup(emailPassword: EmailPassword) {
    return this.http.post(this.BASE_URL + 'signup', emailPassword).
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

    return this.http.post(this.BASE_URL + 'login', emailPassword).
      pipe(take(1), map((token: LoginResponse) => {
        localStorage.setItem(this.JWT_TOKEN, token.accessToken);
        localStorage.setItem(this.REFRESH_TOKEN, token.refreshToken);
        this.user$.next({ id: token.id, email: token.email, role: token.role });
        this.router.navigate([returnUrl]);
      }),
        catchError((error: Response) => {
          if (error.status === 403) {
            return throwError(new WrongCredentialError());
          }
          return throwError(new AppError(error));
        }));
  }

  refreshToken() {
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN);

    return this.http.post(this.BASE_URL + 'refresh-token', { refreshToken }).
      pipe(take(1), tap((token: { accessToken: string }) => {
        localStorage.setItem(this.JWT_TOKEN, token.accessToken);
      }));
  }

  get getStoredToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  async logOut() {
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN);
    this.http.delete(this.BASE_URL + refreshToken).pipe(
      catchError((error: Response) => {
        return throwError(new AppError(error));
      }))
    .subscribe();

    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    this.user$.next(null);
  }
}
