import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAriaComponent } from './text-aria.component';

describe('TextAriaComponent', () => {
  let component: TextAriaComponent;
  let fixture: ComponentFixture<TextAriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextAriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextAriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
