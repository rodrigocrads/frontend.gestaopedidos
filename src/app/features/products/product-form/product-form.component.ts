import { Component, Injector, OnInit } from '@angular/core';
import { Product } from '../shared/product.model';
import { BaseFormComponent } from 'src/app/shared/components/base-form/base-form.component';
import { ProductService } from '../shared/product.service';
import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/category.model';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent extends BaseFormComponent<Product> implements OnInit {
  categories: Category[] = [];

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };

  constructor(
    protected productService: ProductService,
    protected categoryService: CategoryService,
    protected override injector: Injector
  ) {
    super(injector, new Product(), productService, Product.fromJson);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadCategories();
  }

  private loadCategories() {
    this.categoryService.listAll().subscribe({
      next: categories => this.categories = categories,
    });
  }

  protected override buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      description: [''],
      value: ['', [Validators.required]],
      status: ['', [Validators.required]],
      categoryId: ['', [Validators.required]]
    });
  }

  override creationPageTitle(): string {
    return 'Novo Produto';
  }

  override  editionPageTitle(): string {
    return 'Edição do Produto';
  }
}
