import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, take } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppError } from './app-error';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  readonly BASE_URL = 'http://localhost:3000/categories';

  constructor(
    private http: HttpClient
  ) { }

  getCategories() {
    return this.http.get(this.BASE_URL).
      pipe(take(1),
        catchError((error: Response) => {
          return throwError(new AppError(error));
        }));
  }
}
