import { OnInit, Injectable } from '@angular/core';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base.service';

@Injectable()
export class BaseListComponent<T extends BaseResourceModel> implements OnInit {

    resources: T[] = [];

    constructor(private resourceService: BaseResourceService<T>) { }

    ngOnInit(): void {
        this.resourceService.getAll()
            .subscribe({
                next: resources => this.resources = resources,
                error: () => alert('Erro ao tentar carregar a lista')
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
