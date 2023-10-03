import { Component, ElementRef, ViewChild } from '@angular/core';
import { Order } from '../shared/order.model';
import { OrderService } from '../shared/order.service';
import { BaseListComponent } from 'src/app/shared/components/base-list/base-list.component';
import { OrderStatus } from '../shared/order-status.enum';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent extends BaseListComponent<Order> {

  badgeType = '';
  statusOptions = Order.getStatusOptions();

  constructor(protected orderService: OrderService) {
    super(orderService);
  }

  public getStatusDescription(status: string|undefined): string {
    if (!status) {
      return '';
    }
    
    const foundOptions = this.statusOptions.filter(option => option.value === status);

    if (foundOptions.length === 0) {
      return '';
    }

    return foundOptions[0].label;
  }

  public getBadgeTypeClass(status: string|undefined): string {
    switch (status) {
      case OrderStatus.AGUARDANDO_CONFIRMACAO:
        return 'badge-warning';
      case OrderStatus.CONFIRMADO:
        return 'badge-primary';
      case OrderStatus.PENDENTE:
        return 'badge-danger';
      case OrderStatus.CANCELADO:
        return 'badge-light';
      case OrderStatus.CONCLUIDO:
        return 'badge-success';
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
