import { Component, Input, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CategoryService } from 'src/app/common/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent {
  categories$;
  @Input() public category: string;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getAll();
   }

}
