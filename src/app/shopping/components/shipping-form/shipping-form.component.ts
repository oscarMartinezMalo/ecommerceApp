import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { OrderService } from '../../../shared/services/order.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Order } from '../../../shared/models/order.model';
import { ShoppingCart } from '../../../shared/models/shopping-cart.model';
import { User } from 'shared/models/user.model';
import { Shipping } from 'shared/models/shipping.model';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent {
  @Input() cart: ShoppingCart;
  @ViewChild('paypal', { static: true }) paypalRef: ElementRef;

  user: User;
  shipping = { state: 'FL', country: 'US' } as Shipping;  // Shipping default values( Florida, US)

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.user$.pipe(take(1)).subscribe(user => this.user = user);
  }

  async createOrder(shipping) {
    const order = new Order(this.user.id, shipping, this.cart);
    await this.orderService.loadPaypalOrder(order);  // Store the order in the service

    this.router.navigate(['/secure-checkout']);
    // if (window.open(res.paypalUrl, '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=600,height=800') == null) {
    // if (window.open(res, '_self') == null) {
    //   alert('Please desactive the popup blocker');
    // }
    // this.router.navigate(['/order-success', result.id]);
  }
}
