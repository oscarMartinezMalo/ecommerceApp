import { Product } from '../products/product.model';

export interface Item {
  quantity: number;
  product: Product;
}

export class ShoppingCart {
  constructor(public items: Item[]) {}

  get totalItemsCount() {
    let count = 0;
    this.items.forEach(quant => count += quant.quantity);
    return count;
  }
}



