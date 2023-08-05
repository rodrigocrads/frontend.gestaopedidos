import { Component, Input } from '@angular/core';

interface BreadCrumbItem {
  text: string;
  link?: string;
}

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
})
export class BreadCrumbComponent {
  @Input() items: BreadCrumbItem[] = [];

  isLastItem(item: BreadCrumbItem): boolean {
    return this.items.indexOf(item) === this.items.length - 1;
  }
}
