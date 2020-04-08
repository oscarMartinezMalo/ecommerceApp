import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { CategoryService } from '../common/category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from './product.model';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { ShoppingCart } from '../shopping-cart/shopping-cart.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[];
  category;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) { }

  async ngOnInit(): Promise<void> {
    this.cart$ = this.shoppingCartService.cart$;
    this.shoppingCartService.getCart();

    this.populateProducts();
  }


  private appyFilter() {
    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) :
      this.products;
  }

  private populateProducts() {
    this.productService.getAll()
      .pipe(
        switchMap((p: Product[]) => {
          this.products = p;
          return this.route.queryParamMap;
        }))
      .subscribe(params => {
        this.category = params.get('category');
        this.appyFilter();
      });
  }
}
