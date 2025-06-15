import { Component, OnInit } from '@angular/core';
import { Order } from '../../orders/shared/order.model';
import { OrderService } from '../../orders/shared/order.service';

import { Chart, registerables } from 'chart.js';
import { OrderStatus } from '../../orders/shared/order-status.enum';
import moment from 'moment';
Chart.register(...registerables);

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: false
})
export class DashboardComponent implements OnInit {

  orders: Order[] = [];
  goalOfMonth = 1500;
  chartData: object[] = [];

  constructor(
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.orderService.listAll()
      .subscribe({
        next: orders => {
          this.orders = orders;
          this.loadChart();
        }
      });
  }

  public calculateInvoincing(): number {
    const currentDate = new Date();
    const orders = this.filterOrdersByDateAndCompleted(
      currentDate.getMonth(),
      currentDate.getFullYear()
    );
    return this.sumOrdersTotal(orders);
  }

  public calculateGoalDiffPercentage(): number {
    return Math.round(this.calculateInvoincing() * 100 / this.goalOfMonth - 100);
  }

  public waitingConfirmationLength(): number {
    return this.getOrdersByStatus(OrderStatus.AGUARDANDO_CONFIRMACAO).length;
  }

  public confirmedLength(): number {
    return this.getOrdersByStatus(OrderStatus.CONFIRMADO).length;
  }

  public pendingLength(): number {
    return this.getOrdersByStatus(OrderStatus.PENDENTE).length;
  }

  public completedLength(): number {
    const currentDate = new Date();
    const orders = this.filterOrdersByDateAndCompleted(
      currentDate.getMonth(),
      currentDate.getFullYear()
    );
    return orders.length;
  }

  private getOrdersByStatus(status: OrderStatus): Order[] {
    return this.orders.filter(order => order.status === status);
  }

  private loadChart() {
    this.loadChartData();
    new Chart("myChart", {
      type: 'bar',
      data: {
        labels: this.chartData.map((data: any) => data.label),
        datasets: [{
          label: 'Faturamento',
          data: this.chartData.map((data: any) => data.total),
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgb(75, 192, 192)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  private loadChartData() {
    const monthsNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    let monthIndex = new Date().getMonth() -1;
    let year = new Date().getFullYear();

    for (let i=0; i<=11; i++) {

      this.chartData.push({
        label: `${monthsNames[monthIndex]}/${year}`,
        total: this.sumOrdersTotal(this.filterOrdersByDateAndCompleted(monthIndex, year))
      });

      if (monthIndex === 0) {
        monthIndex = 11;
        year--;
        continue;
      }

      monthIndex--;
    }
    
    this.chartData = this.chartData.reverse();
  }

  private filterOrdersByDateAndCompleted(month: number, year: number) {
    return this.orders.filter(order => {
      if (order.status !== OrderStatus.CONCLUIDO) {
        return false;
      }

      const orderDate = moment(order.deliveryDate, 'DD/MM/YYYY');

      const monthMatches = orderDate.month() == month;
      const yearMatches = orderDate.year() == year;

      return monthMatches && yearMatches;
    });
  }

  private sumOrdersTotal(orders: Order[]): number {
    return orders.reduce((acc: number, curr: Order) => {
      const value = `${curr?.total}`.replace('.', '').replace(',', '.');
      return acc + (parseFloat(value) || 0);
    }, 0);
  }
}
