import { ShoppingCart, Item } from '../shopping-cart/shopping-cart.model';
import { Shipping } from '../shipping-form/shipping-form.component';

export class Order {
  // tslint:disable-next-line:variable-name
  _id: string;
  datePlaced: number;
  items: any[];

  constructor(public userId: string, public shipping: Shipping, shoppingCart: ShoppingCart) {
    this.datePlaced = new Date().getTime();

    this.items = shoppingCart.items.map(i => {
      return {
        product: {
          title: i.product.title,
          imageUrl: i.product.imageUrl,
          price: i.product.price
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice
      };
    });
  }

  // get totalPrice() {
  //   console.log('here');
  //   let total = 0;
  //   this.items.forEach(item => {
  //     total += item.totalPrice;
  //     console.log(item.totalPrice);
  //   });
  //   return total;
  // }
}
