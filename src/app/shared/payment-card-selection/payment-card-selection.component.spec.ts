import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCardSelectionComponent } from './payment-card-selection.component';

describe('PaymentCardSelectionComponent', () => {
  let component: PaymentCardSelectionComponent;
  let fixture: ComponentFixture<PaymentCardSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentCardSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentCardSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
