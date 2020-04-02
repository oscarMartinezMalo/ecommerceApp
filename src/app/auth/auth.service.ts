import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { throwError, of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppError } from '../common/app-error';
import { UserExitsError } from '../common/user-exits-error';
import { WrongCredentialError } from '../common/wrong-crendential-error';

interface EmailPassword {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL = 'http://localhost:3000/auth';

  constructor(
    private http: HttpClient
  ) { }

  logIn(emailPassword: EmailPassword) {
    //
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
    return this.http.post(this.BASE_URL + '/login', emailPassword).
      pipe(take(1),
        catchError((error: Response) => {
          console.log(error);
          if (error.status === 403) {
            return throwError(new WrongCredentialError());
          }
          return throwError(new AppError(error));
        }));
  }
}
