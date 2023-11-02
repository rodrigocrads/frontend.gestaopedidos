import { Component, Injector, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { BaseFormComponent } from 'src/app/shared/components/base-form/base-form.component';
import { Order } from '../shared/order.model';
import { OrderService } from '../shared/order.service';
import { FormArray, Validators } from '@angular/forms';
import { Product } from '../../products/shared/product.model';
import { ProductService } from '../../products/shared/product.service';
import { reduce, switchMap } from 'rxjs';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent extends BaseFormComponent<Order> implements OnInit {
  typeOptions: Array<{label: string, value: string}> = [];
  statusOptions = Order.getStatusOptions();

  filteredProducts: Product[] = [];
  selectedProduct: Product = {};

  constructor(
    private primeNgConfig: PrimeNGConfig,
    protected orderService: OrderService,
    protected productService: ProductService,
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
      status: ['AGUARDANDO_CONFIRMACAO'],
      items: this.formBuilder.array([
        this.formBuilder.group({ product: ['', [Validators.required]], quantity: 1}),
      ])
    });
  }

  get items() : FormArray {
    return this.form["items"] as FormArray;
  }

  public subtotal(orderItemIndex: number): number {
    const orderItem = this.resourceForm.value.items[orderItemIndex];
    const productValue = orderItem.product?.value;
    if (productValue) {
      return productValue.replace(",", ".") * orderItem.quantity;
    }
    return 0;
  }

  public total(): number {
    return this.resourceForm.value.items.reduce((acc: number, curr: any) => acc + curr.product?.value?.replace(",", ".") * curr.quantity, 0);
  }

  public addNewItem() {
    const itemForm = this.formBuilder.group({ product: '', quantity: 1 });
    this.items.push(itemForm);
  }

  public deleteItem(itemIndex: number) {
    this.items.removeAt(itemIndex);
  }

  public filterProduct(event: any) {
    this.productService
      .listByFilters([{key: 'name_like', value: event.query}])
      .subscribe({
        next: resources => this.filteredProducts = resources,
        error: () => alert('Erro ao tentar carregar a lista de produtos com filtros')
    });
  }

  override loadResource() {
    if (this.currentAction === 'edit') {
     this.route.paramMap.pipe(
       switchMap(params => {
         return this.resourceService.getById(params.get('id') || '')
       })
     )
     .subscribe({
       next: (resource: any) => {
         this.resource = resource;
         this.deleteItem(0);
         this.resource.items?.forEach(() => this.addNewItem())
         this.resourceForm.patchValue(resource); // binds loaded resource data to ResourceForm
       },
       error: error => {
         alert('Ocorreu um erro no servidor, tente novamente em instantes.');
       }
     })
    }
   }

  protected override creationPageTitle(): string {
    return 'Criar novo pedido';
  }

  protected override editionPageTitle(): string {
    return 'Editando o pedido';
  }
}
