import { Component, Injector, OnInit } from '@angular/core';
import { Customer } from '../shared/customer.model';
import { BaseFormComponent } from 'src/app/shared/components/base-form/base-form.component';
import { CustomerService } from '../shared/customer.service';
import { Validators } from '@angular/forms';

@Component({
    selector: 'app-customer-form',
    templateUrl: './customer-form.component.html',
    styleUrls: ['./customer-form.component.scss'],
    standalone: false
})
export class CustomerFormComponent extends BaseFormComponent<Customer> implements OnInit {

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };

  constructor(
    protected CustomerService: CustomerService,
    protected override injector: Injector
  ) {
    super(injector, new Customer(), CustomerService, Customer.fromJson);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  protected override buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      address: this.formBuilder.group({
        address: ['', [Validators.required]], 
        number: ['', [Validators.required]],
        complement: [''],
        neighborhood: ['', [Validators.required]],
        city: ['', [Validators.required]],
      }),
      cellphone: [null],
      status: ['ATIVO', [Validators.required]],
      birthday: [null]
    });
  }

  override creationPageTitle(): string {
    return 'Novo Cliente';
  }

  override  editionPageTitle(): string {
    return 'Edição do Cliente';
  }
}
