import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {

  @Input() checkBoxOptions: any[];
  @Input() defaultChecked: any = null;
  @Input() formControls: FormControl = new FormControl(null) ;


  ngOnInit() {
    if(this.defaultChecked!== null){
      this.formControls.setValue(this.defaultChecked);
    }
    
  }
}
