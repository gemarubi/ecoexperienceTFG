import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleReviewCardComponent } from './google-review-card.component';

describe('GoogleReviewCardComponent', () => {
  let component: GoogleReviewCardComponent;
  let fixture: ComponentFixture<GoogleReviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoogleReviewCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleReviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
