import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../products/product.model';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { Item, ShoppingCart } from '../shopping-cart/shopping-cart.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product: Product;
  @Input() showActions: false;
  @Input() cart: ShoppingCart;

  constructor(
    private cartService: ShoppingCartService
  ) { }

  async addToCart() {
    await this.cartService.addToCart(this.product);
  }

}


