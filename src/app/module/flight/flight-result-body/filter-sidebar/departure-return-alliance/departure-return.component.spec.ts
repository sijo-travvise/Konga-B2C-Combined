import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartureReturnComponent } from './departure-return.component';

describe('DepartureReturnAllianceComponent', () => {
  let component: DepartureReturnComponent;
  let fixture: ComponentFixture<DepartureReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartureReturnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartureReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
