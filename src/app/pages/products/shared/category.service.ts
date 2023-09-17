
import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base.service';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseResourceService<Category> {
  constructor(protected override injector: Injector) {
    super('categories', injector, Category.fromJson);
  }
}
