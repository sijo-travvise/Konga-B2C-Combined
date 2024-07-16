import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioButtonNolabelComponent } from './radio-button-nolabel.component';

describe('RadioButtonNolabelComponent', () => {
  let component: RadioButtonNolabelComponent;
  let fixture: ComponentFixture<RadioButtonNolabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadioButtonNolabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioButtonNolabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
