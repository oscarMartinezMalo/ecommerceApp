import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Product } from 'shared/models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: Product = {};
  id: string;
  selectedFileOne: File = null;
  selectedFileTwo: File = null;
  selectedFileThird: File = null;

  urlImageOne = './assets/addProduct.png';
  urlImageTwo: string = './assets/addProduct.png';
  urlImageThird: string = './assets/addProduct.png';


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService
    ) {
    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    if ( this.id ) {
      this.productService.getById(this.id).pipe(take(1)).subscribe(p => this.product = p );
    }
  }

  ngOnInit(): void { }

  onFileSelected(event){
    if(event.target.id ==='imageOne'){
      this.selectedFileOne = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(this.selectedFileOne);
      reader.onload = (e: any)=>{ this.urlImageOne = e.target.result;}
    } 
    if(event.target.id ==='imageTwo') {
      this.selectedFileTwo = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(this.selectedFileTwo);
      reader.onload = (e: any)=>{ this.urlImageTwo = e.target.result;}
    }
    if(event.target.id ==='imageThird'){
      this.selectedFileThird = event.target.files[0]; 
      let reader = new FileReader();
      reader.readAsDataURL(this.selectedFileThird);
      reader.onload = (e: any)=>{ this.urlImageThird = e.target.result;}
    } 
  }


  async onSave( product: Product) {    
    // Submit the form as FormData to also send files
    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('price', product.price.toString());
    formData.append('category', product.category );
    formData.append('imageUrl', product.imageUrl);

    // Append Images to the FormData
    let imageList: File[] = [];
    if( this.selectedFileOne ) imageList.push(this.selectedFileOne);
    if( this.selectedFileTwo ) imageList.push(this.selectedFileTwo);
    if( this.selectedFileThird ) imageList.push(this.selectedFileThird);

    if(imageList.length <= 1) { 
      // Show a message that at least one Image is required
    }

    imageList.forEach(image =>{ formData.append('files', image, image.name); }) // Add each image from the list to the FormData

    if ( this.id ) {
      await this.productService.update(this.id, product);
    } else {
      await this.productService.create(formData);
    }
    this.router.navigate(['/admin/products']);
  }

  async delete() {
    if ( confirm('Are you sure you want to delete this product')) {
      await this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }

}
