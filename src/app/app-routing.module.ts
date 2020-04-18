import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { ProductsComponent } from './shopping/components/products/products.component';
import { CheckOutComponent } from './shopping/components/check-out/check-out.component';
import { OrderSuccessComponent } from './shopping/components/order-success/order-success.component';
import { LoginComponent } from './auth/components/login/login.component';
import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';
import { MyOrdersComponent } from './shopping/components/my-orders/my-orders.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { ProductFormComponent } from './admin/components/product-form/product-form.component';
import { ShoppingCartComponent } from './shopping/components/shopping-cart/shopping-cart.component';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { OrderDetailsComponent } from './shared/components/order-details/order-details.component';
import { ErrorPageComponent } from './shared/components/error-page/error-page.component';
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'not_found', component: ErrorPageComponent, data: { message: 'This page can’t be reached'} },
  { path: '**', redirectTo: '/not_found' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
