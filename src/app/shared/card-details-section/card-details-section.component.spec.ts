import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDetailsSectionComponent } from './card-details-section.component';

describe('CardDetailsSectionComponent', () => {
  let component: CardDetailsSectionComponent;
  let fixture: ComponentFixture<CardDetailsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardDetailsSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDetailsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
