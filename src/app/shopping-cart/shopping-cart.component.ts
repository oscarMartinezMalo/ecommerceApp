import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from './shopping-cart.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  cart$: Observable<ShoppingCart>;

  constructor(
    public shoppingCartService: ShoppingCartService
  ) {
    this.cart$ = shoppingCartService.cart$;
    this.shoppingCartService.getCart();
  }

  async clearCart() {
   this.shoppingCartService.clearCart();
  }

}
