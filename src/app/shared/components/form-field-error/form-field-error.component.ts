import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `
    <div class="text-danger">
      {{errorMessage}}
    </div>
  `,
  styleUrls: ['./form-field-error.component.scss']
})
export class FormFieldErrorComponent {

  @Input('form-control') formControl: AbstractControl = {} as AbstractControl;

  public get errorMessage(): string | null {
    if (this.mustShowErrorMessage()) {
      return this.getErrorMessage();
    } else {
      return null
    }
  }

  private getErrorMessage(): string | null {
    if (this.formControl.errors?.['required'] ) {
      return `Dado obrigatório.`;
    }

    if (this.formControl.errors?.['email']) {
      return `Formato de email inválido.`;
    }

    if (this.formControl.errors?.['minlength']) {
      const requiredLength = this.formControl.errors?.['minlength'].requiredLength;
      return `Deve ter no mínimo ${requiredLength} caracteres`;
    }

    if (this.formControl.errors?.['maxlength']) {
      const requiredLength = this.formControl.errors?.['maxlength'].requiredLength;
      return `Deve ter no máximo ${requiredLength} caracteres`;
    }

    return null;
  }

  private mustShowErrorMessage(): boolean {
    return this.formControl?.invalid && this.formControl?.touched;
  }
}
