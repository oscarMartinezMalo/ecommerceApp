import { Component, OnInit, OnDestroy } from '@angular/core';
import { Shipping } from 'src/app/shipping-form/shipping-form.component';
import { ShoppingCart } from 'src/app/shopping-cart/shopping-cart.model';
import { Order } from 'src/app/check-out/order.model';
import { OrderService } from 'src/app/order/order.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnDestroy {
  orders: Order[];
  subscription: Subscription;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {
    this.subscription = this.authService.user$
      .subscribe(async user => {
        if (!user) { return; }
        this.orders = await orderService.getAllOrders(user.id);
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
