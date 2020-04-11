import { Component } from '@angular/core';
import { OrderService } from '../order/order.service';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Order } from '../check-out/order.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {
  order: Order;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.orderService.getOrderById(orderId).then(order => { this.order = order; });
    }
  }

  get totalPrice() {
    let total = 0;
    this.order.items.forEach(item => { total += item.totalPrice; });
    return total;
  }
}
