import { Injectable, Injector } from '@angular/core';

import { Order } from './order.model';

import { BaseResourceService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseResourceService<Order> {

  constructor(protected override injector: Injector) {
    super('orders', injector, Order.fromJson);
  }

}
