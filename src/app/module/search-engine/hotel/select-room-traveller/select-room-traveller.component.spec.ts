import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRoomTravellerComponent } from './select-room-traveller.component';

describe('SelectRoomTravellerComponent', () => {
  let component: SelectRoomTravellerComponent;
  let fixture: ComponentFixture<SelectRoomTravellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectRoomTravellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectRoomTravellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
