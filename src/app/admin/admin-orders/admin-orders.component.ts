import { Component, OnInit } from '@angular/core';
import { Shipping } from 'src/app/shipping-form/shipping-form.component';
import { ShoppingCart } from 'src/app/shopping-cart/shopping-cart.model';
import { Order } from 'src/app/check-out/order.model';
import { OrderService } from 'src/app/order/order.service';
import { AuthService } from 'src/app/auth/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent {
    orders: Order[];

    constructor(
      private orderService: OrderService,
      private authService: AuthService
    ) {
      this.authService.user$.pipe(take(1))
        .subscribe(async user => {
          this.orders = await orderService.getAllOrders(user.id);
        });
    }

  }
