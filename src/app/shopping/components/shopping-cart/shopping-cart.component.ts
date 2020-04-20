import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../../../shared/models/shopping-cart.model';
import { slide } from 'src/animations';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  animations: [slide]
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
