import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneNumberFiledComponent } from './phone-number-filed.component';

describe('PhoneNumberFiledComponent', () => {
  let component: PhoneNumberFiledComponent;
  let fixture: ComponentFixture<PhoneNumberFiledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneNumberFiledComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneNumberFiledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
