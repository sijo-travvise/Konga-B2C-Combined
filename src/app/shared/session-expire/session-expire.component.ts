import { Component,  EventEmitter, Input, Output  } from '@angular/core';

@Component({
  selector: 'app-session-expire',
  templateUrl: './session-expire.component.html',
  styleUrls: ['./session-expire.component.scss']
})
export class SessionExpireComponent {

  @Input() sessionExpiry = "Your session will expire in";
  @Input() expiryTime = " 8 min 09 sec"
  public display: any;
  public timerInterval: any;
  @Output() sessionCompleted: EventEmitter<any> = new EventEmitter();
  constructor() {
    // this.timer(2);
  }
 
  ngOnInit() {
    this.timer(8);
  }

  timer(minute: number) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 60;

    const prefix = minute < 10 ? '0' : '';

    this.timerInterval = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)} min ${textSec} sec`;

      if (seconds == 0) {
        clearInterval(this.timerInterval);
        this.sessionCompleted.emit('sessionCompleted');
      }
    }, 1000);
  }

}
