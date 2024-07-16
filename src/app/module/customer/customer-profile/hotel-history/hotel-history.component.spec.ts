import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelHistoryComponent } from './hotel-history.component';

describe('HotelHistoryComponent', () => {
  let component: HotelHistoryComponent;
  let fixture: ComponentFixture<HotelHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
