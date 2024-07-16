import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateSelectionComponent } from './state-selection.component';

describe('StateSelectionComponent', () => {
  let component: StateSelectionComponent;
  let fixture: ComponentFixture<StateSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
