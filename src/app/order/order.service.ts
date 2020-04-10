import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  readonly BASE_URL = 'http://localhost:3000/orders/';
  constructor(
    private http: HttpClient
  ) { }

  storeOrder( order) {
    console.log(order);
    this.http.post(this.BASE_URL, order).subscribe();
  }
}
