import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AppError } from '../common/app-error';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly BASE_URL = 'http://localhost:3000/products/';
  constructor(
    private http: HttpClient
  ) { }

  create(product) {
    return this.http.post(this.BASE_URL, product).
      pipe(take(1),
        catchError((error: Response) => {
          return throwError(new AppError(error));
        })).toPromise();
  }

  getAll() {
    return this.http.get(this.BASE_URL).
      pipe(take(1),
        catchError((error: Response) => {
          return throwError(new AppError(error));
        }));
  }

  getById(id: string) {
    console.log(id);
    return this.http.get(this.BASE_URL + id).
      pipe(take(1),
        catchError((error: Response) => {
          return throwError(new AppError(error));
        }));
  }

  update(productId, product) {
    return this.http.patch(this.BASE_URL + productId, product).
      pipe(take(1),
        catchError((error: Response) => {
          return throwError(new AppError(error));
        })).toPromise();
  }

  delete( productId ) {
    return this.http.delete(this.BASE_URL + productId).
    pipe(take(1),
      catchError((error: Response) => {
        return throwError(new AppError(error));
      })).toPromise();
  }
}
