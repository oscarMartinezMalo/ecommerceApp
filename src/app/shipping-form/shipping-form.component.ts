import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from '../order/order.service';
import { AuthService, User } from '../auth/auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Order } from '../check-out/order.model';
import { ShoppingCart } from '../shopping-cart/shopping-cart.model';

export interface Shipping {
  name: string;
  address: string;
  apartment: string;
  city: string;
}

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent{
  @Input() cart: ShoppingCart;
  shipping = {} as Shipping;
  user: User;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.user$.pipe(take(1)).subscribe(user => this.user = user);
   }

  async placeOrder(shipping) {
    const order = new Order(this.user.id, shipping, this.cart);
    const result = await this.orderService.storeOrder(order);
    this.router.navigate(['/order-success', result.id]);
  }
}
