import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoAperturaPeriodoComponent } from './proceso-apertura-periodo.component';

describe('ProcesoAperturaPeriodoComponent', () => {
  let component: ProcesoAperturaPeriodoComponent;
  let fixture: ComponentFixture<ProcesoAperturaPeriodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcesoAperturaPeriodoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcesoAperturaPeriodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
