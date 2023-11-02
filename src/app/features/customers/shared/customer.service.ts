import { Injectable, Injector } from '@angular/core';
import { Customer } from './customer.model';
import { BaseResourceService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseResourceService<Customer> {
  constructor(protected override injector: Injector) {
    super('customers', injector, Customer.fromJson);
  }
}
