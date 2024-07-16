import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelRoomSearchEngineComponent } from './hotel-room-search-engine.component';

describe('HotelRoomSearchEngineComponent', () => {
  let component: HotelRoomSearchEngineComponent;
  let fixture: ComponentFixture<HotelRoomSearchEngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelRoomSearchEngineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelRoomSearchEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
