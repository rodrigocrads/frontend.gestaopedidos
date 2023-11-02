import { Component } from '@angular/core';
import { BaseListComponent } from 'src/app/shared/components/base-list/base-list.component';
import { Customer } from '../shared/customer.model';
import { CustomerService } from '../shared/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent extends BaseListComponent<Customer>{
  constructor(
    protected customerService: CustomerService
  ) {
    super(customerService);
  }
}
