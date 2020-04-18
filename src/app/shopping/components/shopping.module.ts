import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { SharedModule } from 'shared/shared.module';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderDetailsComponent } from 'shared/components/order-details/order-details.component';



@NgModule({
  declarations: [
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    ShoppingCartComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'products', component: ProductsComponent },
      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard] },
      { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
      { path: 'my/orders/:id', component: OrderDetailsComponent, canActivate: [AuthGuard] },
      { path: 'shopping-cart', component: ShoppingCartComponent },
    ])
  ]
})
export class ShoppingModule { }
