import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-inner-page-title',
  templateUrl: './inner-page-title.component.html',
  styleUrls: ['./inner-page-title.component.scss']
})
export class InnerPageTitleComponent {
  @Input() detailPageTitle: string;
  @Input() detailPageParagraph:string;
}
