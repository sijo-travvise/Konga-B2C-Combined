import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-after-session-expired',
  templateUrl: './modal-after-session-expired.component.html',
  styleUrls: ['./modal-after-session-expired.component.scss']
})
export class ModalAfterSessionExpiredComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  refreshPage() {
    window.location.reload();
   }
}
