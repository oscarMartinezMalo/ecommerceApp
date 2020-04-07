import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../products/product.model';
import { take } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ShoppingCart } from './shopping-cart.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  readonly BASE_URL = 'http://localhost:3000/cart/';
  cart$ = new Subject<ShoppingCart>();

  constructor(
    private http: HttpClient
  ) { }

  async create() {
    return this.http.get(this.BASE_URL + 'create').toPromise() as Promise<{ id: string }>;
  }

  async getCart() {
    const cartId = await this.getOrCreateCartId();

    this.http.get(this.BASE_URL + cartId)
    .pipe(take(1))
    .subscribe(cart => {
      const newCart = new ShoppingCart((cart as ShoppingCart).items);
      this.cart$.next(newCart);
    });
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
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  async updateItemQuantity(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    this.http.post(this.BASE_URL + 'update-item-quantity', { cartId, product, change })
    .pipe(take(1))
    .subscribe(cart => {
      const newCart = new ShoppingCart((cart as ShoppingCart).items);
      this.cart$.next(newCart);
    });
  }

}
