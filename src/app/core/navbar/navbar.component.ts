import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';
import { Item, ShoppingCart } from 'src/app/shopping-cart/shopping-cart.model';
import { Observable } from 'rxjs';
import { AuthService, User } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isCollapsed = false;
  cart$: Observable<ShoppingCart>;
  user: User;

  constructor(
     private shoppingCartServive: ShoppingCartService,
     private authService: AuthService,
     private router: Router
     ) {
    this.cart$ = shoppingCartServive.cart$;
    authService.user$?.subscribe( user => { this.user = user; });
  }

  ngOnInit(): void {
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/']);
  }

}
