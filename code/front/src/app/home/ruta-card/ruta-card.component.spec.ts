import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaCardComponent } from './ruta-card.component';

describe('RutaCardComponent', () => {
  let component: RutaCardComponent;
  let fixture: ComponentFixture<RutaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RutaCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
