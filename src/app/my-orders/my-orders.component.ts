import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order/order.service';
import { AuthService } from '../auth/auth.service';
import { take } from 'rxjs/operators';
import { Order } from '../check-out/order.model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  orders: Order[];

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) { }

  async ngOnInit(): Promise<void> {
    this.orders = await this.orderService.getMyOrders();
  }
}

