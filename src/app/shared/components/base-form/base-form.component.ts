import { AfterContentChecked, OnInit, Injector, Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base.service';

import { switchMap } from 'rxjs/operators';

@Injectable()
export abstract class BaseFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  currentAction: string = '';
  resourceForm: FormGroup = {} as FormGroup;
  pageTitle: string = '';
  serverErrorMessages: string[] = [];
  submittingForm: boolean = false;

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService<T>,
    protected jsonDataToResourceFn: (jsonData: any) => T,
  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
  }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  get form(): { [key: string]: AbstractControl; }
  {
    return this.resourceForm.controls;
  }

  public submitForm(): void {
    this.submittingForm = true;

    if (this.currentAction === 'new') {
      this.createResource();
      return;
    } 
      this.updateResource();
  }

  protected loadResource() {
   if (this.currentAction === 'edit') {
    this.route.paramMap.pipe(
      switchMap(params => {
        return this.resourceService.getById(params.get('id') || '')
      })
    )
    .subscribe({
      next: resource => {
        this.resource = resource;
        this.resourceForm.patchValue(resource); // binds loaded resource data to ResourceForm 
      },
      error: () => {
        alert('Ocorreu um erro no servidor, tente novamente em instantes.');
      }
    })
   }
  }

  protected setCurrentAction() {
    this.currentAction = this.route.snapshot.url[0].path === 'new'
        ? 'new'
        : 'edit';
  }

  protected setPageTitle() {
    if (this.currentAction == 'new') {
      this.pageTitle = this.creationPageTitle();
      return;
    }
    this.pageTitle = this.editionPageTitle();
  }

  protected creationPageTitle(): string {
    return 'Novo';
  }

  protected editionPageTitle(): string {
    return 'Edição';
  }

  protected createResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

    this.resourceService
      .create(resource)
      .subscribe({
        next: (resource) => this.actionsForSuccess(resource),
        error: (error) => this.actionsForError(error),
      });
  }

  protected updateResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
  
    this.resourceService.update(resource)
      .subscribe({
          next: (resource) => this.actionsForSuccess(resource),
          error: (error) => this.actionsForError(error),
      });
  }

  protected actionsForSuccess(resource: T) {
    alert("Solicitação processada com sucesso!");

    const baseComponentPath: string | undefined = this.route.snapshot.parent?.url[0].path;

    if (!baseComponentPath) {
        throw new Error('Não foi encontrado um rota pai');
    }

    this.router
        .navigateByUrl(baseComponentPath, { skipLocationChange: true })
        .then(() => this.router.navigate([baseComponentPath, resource.id, 'edit']));
  }

  protected actionsForError(error: any) {
    alert('Ocorreu um erro ao processar a sua solicitação.');
    this.submittingForm = false;

    if (error.status === 422) {
      // recuperação de erros no formato de backend ruby on rails
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ['Falha na comunicação com o servidor. Por favor, tente novamente mais tarde.']
    }
  }

  protected abstract buildResourceForm(): void;
}
