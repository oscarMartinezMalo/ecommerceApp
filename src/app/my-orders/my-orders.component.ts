import { Component } from '@angular/core';
import { OrderService } from '../order/order.service';
import { AuthService } from '../auth/auth.service';
import { take } from 'rxjs/operators';
import { Order } from '../check-out/order.model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent {
  orders: Order[];

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {
    this.authService.user$.pipe(take(1))
      .subscribe(async user => {
        this.orders = await orderService.getMyOrders(user.id);
      });
  }
}

