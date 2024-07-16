import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelSearchEngineComponent } from './hotel-search-engine.component';

describe('HotelSearchEngineComponent', () => {
  let component: HotelSearchEngineComponent;
  let fixture: ComponentFixture<HotelSearchEngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelSearchEngineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelSearchEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
