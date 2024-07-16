import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelWishlistComponent } from './hotel-wishlist.component';

describe('HotelWishlistComponent', () => {
  let component: HotelWishlistComponent;
  let fixture: ComponentFixture<HotelWishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelWishlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
