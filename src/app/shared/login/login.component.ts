import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  activeIndex = 0;
  forgotWindow:boolean = false

  @Output() isCloseLogin: EventEmitter<boolean> = new EventEmitter(false);

  forgotPassword(){
    this.forgotWindow = true;
    this.isCloseLogin.emit(false);
  }
  backToLogin(event){
    this.forgotWindow = false;
    this.isCloseLogin.emit(true);
  }
}
