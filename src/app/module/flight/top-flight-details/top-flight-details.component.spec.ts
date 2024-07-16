import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopFlightDetailsComponent } from './top-flight-details.component';

describe('TopFlightDetailsComponent', () => {
  let component: TopFlightDetailsComponent;
  let fixture: ComponentFixture<TopFlightDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopFlightDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopFlightDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
