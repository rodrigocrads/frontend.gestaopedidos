import { Component, Injector, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Order } from '../shared/order.model';
import { OrderService } from '../shared/order.service';
import { MinLengthValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent extends BaseResourceFormComponent<Order> implements OnInit {
  typeOptions: Array<{label: string, value: string}> = [];

  constructor(
    private primeNgConfig: PrimeNGConfig,
    protected orderService: OrderService,
    protected override injector: Injector
  ) {
    super(injector, new Order(), orderService, Order.fromJson);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.primeNgConfig.setTranslation({
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      monthNames: [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar',
    });
  }

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };

  protected override buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      details: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      client: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      deliveryDate: ['', [Validators.required]],
      total: ['', [Validators.required]],
    });
  }

  protected override creationPageTitle(): string {
    return 'Cadastro de novo pedido';
  }

  protected override editionPageTitle(): string {
    return 'Editando o pedido';
  }
}
