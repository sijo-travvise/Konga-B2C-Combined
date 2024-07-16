import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelPolicyHeaderComponent } from './travel-policy-header.component';

describe('TravelPolicyHeaderComponent', () => {
  let component: TravelPolicyHeaderComponent;
  let fixture: ComponentFixture<TravelPolicyHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelPolicyHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelPolicyHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
