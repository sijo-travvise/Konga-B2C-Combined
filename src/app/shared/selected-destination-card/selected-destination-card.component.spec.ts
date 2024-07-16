import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedDestinationCardComponent } from './selected-destination-card.component';

describe('SelectedDestinationCardComponent', () => {
  let component: SelectedDestinationCardComponent;
  let fixture: ComponentFixture<SelectedDestinationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedDestinationCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedDestinationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
