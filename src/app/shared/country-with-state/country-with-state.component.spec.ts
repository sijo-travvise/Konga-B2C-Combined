import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryWithStateComponent } from './country-with-state.component';

describe('CountryWithStateComponent', () => {
  let component: CountryWithStateComponent;
  let fixture: ComponentFixture<CountryWithStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryWithStateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryWithStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
