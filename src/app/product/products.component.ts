import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { CategoryService } from '../common/category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from './product.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[];
  categories$;
  category;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    categoryService: CategoryService
  ) {
    productService.getAll().
    pipe(
      switchMap((p: Product[]) => {
        this.products = p;
        return route.queryParamMap;
      }))
      .subscribe( params => {
        this.category = params.get('category');

        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
      });

    this.categories$ = categoryService.getAll();

    // route.queryParamMap.subscribe(params => {
    //   this.category = params.get('category');

    //   this.filteredProducts = (this.category) ?
    //     this.products.filter(p => p.category === this.category) :
    //     this.products;
    // });
  }

}
