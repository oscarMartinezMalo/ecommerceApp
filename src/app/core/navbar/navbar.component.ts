import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';
import { Item, ShoppingCart } from 'src/app/shopping-cart/shopping-cart.model';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  cart$: Observable<ShoppingCart>;
  user: string;

  constructor(
     private shoppingCartServive: ShoppingCartService,
     private authService: AuthService
     ) {
    this.cart$ = shoppingCartServive.cart$;
    authService.user$?.subscribe( user => {
      console.log(user);
      this.user = user; });
  }

  ngOnInit(): void {
  }

}
