import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppError } from './common/app-error';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly BASE_URL = 'http://localhost:3000/products';
  constructor(
    private http: HttpClient
  ) { }

  create(product) {
    return this.http.post(this.BASE_URL, product).
      pipe(take(1),
        catchError((error: Response) => {
          return throwError(new AppError(error));
        }));
  }

  getAll() {
    return this.http.get(this.BASE_URL).
      pipe(take(1),
        catchError((error: Response) => {
          return throwError(new AppError(error));
        }));
  }
}
