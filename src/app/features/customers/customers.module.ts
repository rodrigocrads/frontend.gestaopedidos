import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientsRoutingModule } from './customers.module-routing';
import { IMaskModule } from 'angular-imask';
import { CalendarModule } from 'primeng/calendar';
import {InputMaskModule} from 'primeng/inputmask';

@NgModule({
  declarations: [
    CustomerFormComponent,
    CustomerListComponent
  ],
  imports: [
    ClientsRoutingModule,
    IMaskModule,
    CommonModule,
    SharedModule,
    CalendarModule,
    InputMaskModule,
  ]
})
export class CustomersModule {}
