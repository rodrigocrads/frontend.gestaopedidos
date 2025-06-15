import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-page-header',
    templateUrl: './page-header.component.html',
    standalone: false
})
export class PageHeaderComponent {
  @Input('page-title') pageTitle: string = '';
  @Input('show-button') showButton: boolean = true;
  @Input('btn-class') btnClass: string = '';
  @Input('btn-text') btnText: string = '';
  @Input('btn-link') btnLink: string = '';
}
