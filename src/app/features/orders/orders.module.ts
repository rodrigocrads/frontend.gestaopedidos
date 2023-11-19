import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrdersRoutingModule } from 'src/app/features/orders/orders.module-routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { IMaskModule } from 'angular-imask';
import { CalendarModule } from 'primeng/calendar';
import {InputMaskModule} from 'primeng/inputmask';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule }   from '@angular/forms';

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
    AutoCompleteModule,
    InputMaskModule,
    FormsModule
  ]
})
export class OrdersModule {}
