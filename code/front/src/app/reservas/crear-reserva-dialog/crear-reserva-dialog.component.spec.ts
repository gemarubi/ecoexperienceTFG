import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearReservaDialogComponent } from './crear-reserva-dialog.component';

describe('CrearReservaDialogComponent', () => {
  let component: CrearReservaDialogComponent;
  let fixture: ComponentFixture<CrearReservaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearReservaDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearReservaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
