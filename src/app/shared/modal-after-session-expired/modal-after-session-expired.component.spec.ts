import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAfterSessionExpiredComponent } from './modal-after-session-expired.component';

describe('ModalAfterSessionExpiredComponent', () => {
  let component: ModalAfterSessionExpiredComponent;
  let fixture: ComponentFixture<ModalAfterSessionExpiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAfterSessionExpiredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAfterSessionExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
