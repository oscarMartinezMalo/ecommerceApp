import { Product } from '../products/product.model';

export class Item {
  constructor(public quantity: number, public product: Product) { }
  get totalPrice() { return this.product.price * this.quantity; }
}

export class ShoppingCart {
  constructor(public items: Item[]) { }

  getQuantity(product: Product) {
    const cartItem = this.items.find(item => {
      return item.product.id === product.id;
    });
    return cartItem ? cartItem.quantity : 0;
  }

  get totalItemsCount() {
    let count = 0;
    this.items.forEach(quant => count += quant.quantity);
    return count;
  }

  get totalPrice() {
    let total = 0;
    this.items.forEach(item => { total += item.totalPrice; });
    return total;
  }

}



