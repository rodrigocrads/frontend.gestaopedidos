import { OnInit, Injectable } from '@angular/core';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService, QueryParam } from '../../services/base.service';

@Injectable()
export class BaseListComponent<T extends BaseResourceModel> implements OnInit {

    resources: T[] = [];

    constructor(private resourceService: BaseResourceService<T>) { }

    ngOnInit(): void {
        this.listAll();
    }

    listAll() {
        this.resourceService.listAll()
            .subscribe({
                next: resources => this.resources = resources,
                error: () => alert('Erro ao tentar carregar a lista')
            });
    }

    listByFilter(filters: QueryParam[] = []) {
        this.resourceService.listByFilters(filters)
            .subscribe({
                next: resources => this.resources = resources,
                error: () => alert('Erro ao tentar carregar a lista com filtros')
            });
    }

    delete(resource: T) {
        if (!resource.id) return;

        const mustDelete = confirm('Realmente deseja excluir?');
        if (mustDelete) {
            this.resourceService.delete(resource.id).subscribe({
                next: () => this.resources = this.resources.filter(element => element != resource),
                error: () => alert('Erro ao tentar excluir')
            });
        }
    }
}
