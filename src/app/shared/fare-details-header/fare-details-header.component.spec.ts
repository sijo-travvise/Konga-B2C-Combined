import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FareDetailsHeaderComponent } from './fare-details-header.component';

describe('FareDetailsHeaderComponent', () => {
  let component: FareDetailsHeaderComponent;
  let fixture: ComponentFixture<FareDetailsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FareDetailsHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FareDetailsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
