import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelItineraryDetailsComponent } from './hotel-itinerary-details.component';

describe('HotelItineraryDetailsComponent', () => {
  let component: HotelItineraryDetailsComponent;
  let fixture: ComponentFixture<HotelItineraryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelItineraryDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelItineraryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
