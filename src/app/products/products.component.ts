import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { CategoryService } from '../common/category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from './product.model';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[];
  category;
  cart: any;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {
    productService.getAll().
      pipe(
        switchMap((p: Product[]) => {
          this.products = p;
          return route.queryParamMap;
        }))
      .subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
      });

  }
  async ngOnInit(): Promise<void> {
    // this.cart = await this.shoppingCartService.getCart();
    this.shoppingCartService.getCart();
    this.shoppingCartService.cart$.subscribe( shoppingCart => {
      this.cart = shoppingCart;
    });
  }

}
