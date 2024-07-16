import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelResultBodyComponent } from './hotel-result-body.component';

describe('HotelResultBodyComponent', () => {
  let component: HotelResultBodyComponent;
  let fixture: ComponentFixture<HotelResultBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelResultBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelResultBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
