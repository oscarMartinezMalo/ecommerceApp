import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { ShoppingCart } from '../shopping-cart/shopping-cart.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  cart$: Observable<ShoppingCart>;

  constructor(
    private shoppingCart: ShoppingCartService
  ) { }

  ngOnInit(): void {
    this.cart$ = this.shoppingCart.cart$;
    this.shoppingCart.getCart();
  }
}
