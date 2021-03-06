import { ShoppingCart } from './shopping-cart.model';
import { Shipping } from './shipping.model';

export class Order {
  // tslint:disable-next-line:variable-name
  _id: string;
  datePlaced: number;
  items: any[];
  paypalOrderID: string;
  paypalPayerID: string;

  constructor(public userId: string, public shipping: Shipping, shoppingCart: ShoppingCart) {
    this.datePlaced = new Date().getTime();

    this.items = shoppingCart.items.map(i => {
      return {
        product: {
          id: i.product.id,
          title: i.product.title,
          imageUrl: i.product.imageUrl,
          price: i.product.price
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice
      };
    });
  }
}
