import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/common/category.service';
import { ProductService } from 'src/app/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/product/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: Product = {};
  id: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService
    ) {
    this.categories$ = categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if ( this.id ) {
      this.productService.getById(this.id).pipe(take(1)).subscribe(p => this.product = p );
    }
  }

  ngOnInit(): void { }

  async onSave( product) {
    if ( this.id) {
      await this.productService.update(this.id, product);
    } else {
      await this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  async delete() {
    if ( confirm('Are you sure you want to delete this product')){
      await this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }

}
