import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../check-out/order.model';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  readonly BASE_URL = 'http://localhost:3000/orders/';
  constructor(
    private http: HttpClient,
    private shoppingCart: ShoppingCartService
  ) { }

  async storeOrder(order: Order) {
    const result = await this.http.post(this.BASE_URL, order).toPromise() as Promise<{ id: string }>;
    this.shoppingCart.clearCart();
    return result;
  }

  async getOrders(userId: string) {
    const result = await this.http.get(this.BASE_URL + '/orders').toPromise() as Promise<Order[]>;
    return result;
  }

  async getMyOrders(userId: string) {
    const result = await this.http.get(this.BASE_URL + userId ).toPromise() as Promise<Order[]>;
    return result;
  }

  async getAllOrders(userId: string) {
    const result = await this.http.get(this.BASE_URL).toPromise() as Promise<Order[]>;
    return result;
  }
}
