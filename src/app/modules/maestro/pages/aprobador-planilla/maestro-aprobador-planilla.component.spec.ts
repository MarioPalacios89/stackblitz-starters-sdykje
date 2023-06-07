import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroAprobadorPlanillaComponent } from './maestro-aprobador-planilla.component';

describe('MaestroAprobadorPlanillaComponent', () => {
  let component: MaestroAprobadorPlanillaComponent;
  let fixture: ComponentFixture<MaestroAprobadorPlanillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaestroAprobadorPlanillaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaestroAprobadorPlanillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
