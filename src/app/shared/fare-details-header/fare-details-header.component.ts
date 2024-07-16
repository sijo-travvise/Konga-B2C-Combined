import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fare-details-header',
  templateUrl: './fare-details-header.component.html',
  styleUrls: ['./fare-details-header.component.scss'],
})
export class FareDetailsHeaderComponent {
  @Input() fareTitle: string = '';
}
