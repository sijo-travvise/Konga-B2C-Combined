import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopHotelDealsComponent } from './top-hotel-deals.component';

describe('TopHotelDealsComponent', () => {
  let component: TopHotelDealsComponent;
  let fixture: ComponentFixture<TopHotelDealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopHotelDealsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopHotelDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
