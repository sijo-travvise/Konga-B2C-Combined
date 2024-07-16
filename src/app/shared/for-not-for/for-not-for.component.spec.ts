import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForNotForComponent } from './for-not-for.component';

describe('ForNotForComponent', () => {
  let component: ForNotForComponent;
  let fixture: ComponentFixture<ForNotForComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForNotForComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForNotForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
