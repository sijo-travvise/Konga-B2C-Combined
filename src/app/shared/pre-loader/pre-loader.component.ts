import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pre-loader',
  templateUrl: './pre-loader.component.html',
  styleUrls: ['./pre-loader.component.scss'],
  providers: [MessageService]
})
export class PreLoaderComponent {

  @Input() loderTitle: string = "Data Fetching...";
  @Input() isLoadingComplete : boolean =false;
  value: number = 0;
  public isShow:boolean=false;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
      let interval = setInterval(() => {
        if( this.isLoadingComplete ){
          this.value = this.value + Math.floor(Math.random() * 10) + 1;
          
          if (this.value >= 92) {
            this.value = 92;
        }
        }
        else{
          this.value = this.value + Math.floor(Math.random() * 10) + 40;
          if (this.value >= 100) {
            this.value = 100;
        }
        }
         
      }, 1500);
  }
  
}
