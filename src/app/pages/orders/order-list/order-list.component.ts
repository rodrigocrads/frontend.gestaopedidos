import { Component, ElementRef, ViewChild } from '@angular/core';
import { Order } from '../shared/order.model';
import { OrderService } from '../shared/order.service';
import { BaseListComponent } from 'src/app/shared/components/base-list/base-list.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent extends BaseListComponent<Order> {

  badgeType = '';

  constructor(protected orderService: OrderService) {
    super(orderService);
  }

  public getStatusDescription(status: string|undefined): string {
    switch (status) {
      case 'AGUARDANDO_CONFIRMACAO':
        return 'Aguardando Confirmação';
      default:
        return '';
    }
  }

  public getBadgeTypeClass(status: string|undefined): string {
    switch (status) {
      case 'AGUARDANDO_CONFIRMACAO':
        return 'badge-warning';
      default:
        return 'badge-primary';
    }
  }

  public format(text: string): string {
    const limit = 40;

    if (text.length > limit) {
      return `${text.slice(0, limit)}[...]`;
    }

    return text;
  }

  // todo: criar uma lógica mais inteligente a medida que for acrescentado mais filtros
  public filterOrders(event: any) {
    if (event.target.value === '') {
      this.listAll();
      return;
    }

    this.listByFilter([{ key: 'status', value: event.target.value }]);
  }
}
