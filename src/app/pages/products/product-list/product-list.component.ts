import { Component } from '@angular/core';
import { BaseListComponent } from 'src/app/shared/components/base-list/base-list.component';
import { Product } from '../shared/product.model';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent extends BaseListComponent<Product>{
  categoriesOptions = [
    {value: 'cb555d82-da5a-4a9c-b8b0-4ee46e6beb20', label: 'Biscoitos Amanteigados'},
    {value: 'cb555d82-da5a-4a9c-b8b0-4ee46e6beb21', label: 'Biscoitos Decorados'},
  ];

  constructor(
    protected productService: ProductService
  ) {
    super(productService);
  }

  // todo: criar uma lógica mais inteligente a medida que for acrescentado mais filtros
  public filterByCategory(event: any) {
    if (event.target.value === '') {
      this.listAll();
      return;
    }

    this.listByFilter([{ key: 'category.id', value: event.target.value }]);
  }
}
