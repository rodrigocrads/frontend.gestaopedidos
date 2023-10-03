import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsRoutingModule } from './products.module-routing';
import { IMaskModule } from 'angular-imask';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    ProductFormComponent,
    ProductListComponent
  ],
  imports: [
    ProductsRoutingModule,
    IMaskModule,
    CommonModule,
    SharedModule,
    CalendarModule,
  ]
})
export class ProductsModule {}
