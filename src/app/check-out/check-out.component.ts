import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { ShoppingCart } from '../shopping-cart/shopping-cart.model';
import { take } from 'rxjs/operators';
import { OrderService } from '../order/order.service';
import { AuthService, User } from '../auth/auth.service';
import { Order } from './order.model';

interface Shipping {
  name: string;
  address: string;
  apartment: string;
  city: string;
}

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  shipping = {} as Shipping;
  cart: ShoppingCart;
  user: User;

  constructor(
    private orderService: OrderService,
    private shoppingCart: ShoppingCartService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.shoppingCart.cart$.pipe(take(1)).subscribe(cart => this.cart = cart);
    this.authService.user$.pipe(take(1)).subscribe(user => this.user = user);
    this.shoppingCart.getCart();
  }


  placeOrder(shipping) {
    console.log('cart', this.cart);
    console.log('id', this.user.id);
    let x = new Order(this.user.id, shipping, this.cart);
    console.log(x);
    // this.orderService.storeOrder(order);
  }

}
