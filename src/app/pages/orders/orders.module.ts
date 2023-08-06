import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrdersRoutingModule } from 'src/app/pages/orders/orders.module-routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { IMaskModule } from 'angular-imask';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    OrderFormComponent,
    OrderListComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule,
    IMaskModule,
    CalendarModule,
  ]
})
export class OrdersModule {}
