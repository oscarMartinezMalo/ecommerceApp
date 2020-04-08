import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';
import { Item, ShoppingCart } from 'src/app/shopping-cart/shopping-cart.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  cart$: Observable<ShoppingCart>;

  constructor( private shoppingCartServive: ShoppingCartService) {
    this.cart$ = shoppingCartServive.cart$;
  }

  ngOnInit(): void {
  }

}
