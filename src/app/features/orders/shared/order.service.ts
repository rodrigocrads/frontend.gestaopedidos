import { Injectable, Injector } from '@angular/core';

import { Order } from './order.model';

import { BaseResourceService, QueryParam } from 'src/app/shared/services/base.service';
import { Observable, map } from 'rxjs';
import { OrderStatus } from './order-status.enum';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseResourceService<Order> {
  constructor(protected override injector: Injector) {
    super('orders', injector, Order.fromJson);
  }

  override listAll(): Observable<Order[]> {
    return super.listAll()
      .pipe(
        map((orders: Order[]) => this.sortByStatus(orders)),
      );
  }

  private sortByStatus(orders : Order[]) {
    return orders.sort((a: Order, b: Order) => this.getPriorityByStatus(a) - this.getPriorityByStatus(b));
  }

  private getPriorityByStatus(order : Order): number {
    switch (order.status) {
      case OrderStatus.PENDENTE:
        return 1;
      case OrderStatus.AGUARDANDO_CONFIRMACAO:
        return 2;
      case OrderStatus.CONFIRMADO:
        return 3;
      default:
        return 4;
    }
  }
}
