import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent {

  @Input() radioOptions: any[];
  @Input() defaultChecked: any = null;
  @Input() formControls: FormControl = new FormControl('') ;
  @Input() type: string = 'radio';


  ngOnInit() {
    if(this.defaultChecked!== null){
      this.formControls.setValue(this.defaultChecked);
    }
    
  }
}
