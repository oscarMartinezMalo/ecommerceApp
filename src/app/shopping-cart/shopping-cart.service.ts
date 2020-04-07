import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../products/product.model';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  readonly BASE_URL = 'http://localhost:3000/cart/';

  constructor(
    private http: HttpClient
  ) { }

  async create() {
    return this.http.get(this.BASE_URL + 'create').toPromise() as Promise<{ id: string }>;
  }

  async getCart() {
    const cartId = await this.getOrCreateCartId();
    return (await this.http.get(this.BASE_URL + cartId).toPromise());
  }

  getItem(cartId: string, productId: string) {
    return this.http.post(this.BASE_URL, { cartId, productId });
  }

  async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }

    cartId = (await this.create()).id;
    localStorage.setItem('cartId', cartId);
    return cartId;
  }

  async addToCart(product: Product) {
    const cartId = await  this.getOrCreateCartId();
    this.http.post(this.BASE_URL + 'add-item', {cartId, product}).pipe(take(1)).subscribe();
  }
}
