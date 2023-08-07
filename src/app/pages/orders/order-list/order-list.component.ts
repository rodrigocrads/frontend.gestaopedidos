import { Component } from '@angular/core';
import { Order } from '../shared/order.model';
import { OrderService } from '../shared/order.service';
import { BaseListComponent } from 'src/app/shared/components/base-list/base-list.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent extends BaseListComponent<Order> {

  constructor(protected orderService: OrderService) {
    super(orderService);
  }

}
