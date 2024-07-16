import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelModifySearchEngineComponent } from './hotel-modify-search-engine.component';

describe('HotelModifySearchEngineComponent', () => {
  let component: HotelModifySearchEngineComponent;
  let fixture: ComponentFixture<HotelModifySearchEngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelModifySearchEngineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelModifySearchEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
