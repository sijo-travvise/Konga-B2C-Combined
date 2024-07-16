import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalAmountCardComponent } from './total-amount-card.component';

describe('TotalAmountCardComponent', () => {
  let component: TotalAmountCardComponent;
  let fixture: ComponentFixture<TotalAmountCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalAmountCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalAmountCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
