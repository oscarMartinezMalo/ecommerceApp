import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../products/product.model';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

interface Item {
  quantity: number;
  product: Product;
}

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product: Product;
  @Input() showActions: false;
  @Input() cart;

  constructor(
    private cartService: ShoppingCartService
  ) { }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  getQuantity() {
    if (!this.cart) { return 0; }
    console.log(this.cart.items);
    const cartItem = (this.cart.items as Item[]).find(item => {
      return item.product.id === this.product.id;
    });

    return cartItem ? cartItem.quantity : 0;
  }
}


