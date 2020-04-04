import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/common/category.service';
import { ProductService } from 'src/app/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  categories$;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService
    ) {

    this.categories$ = categoryService.getCategories();
  }

  ngOnInit(): void { }

  onSubmit( product) {
    this.productService.create(product).
    subscribe(res => console.log(res));
    this.router.navigate(['/admin/products']);
  }

}
