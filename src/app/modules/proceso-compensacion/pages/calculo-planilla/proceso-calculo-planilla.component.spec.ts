import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoCalculoPlanillaComponent } from './proceso-calculo-planilla.component';

describe('ProcesoCalculoPlanillaComponent', () => {
  let component: ProcesoCalculoPlanillaComponent;
  let fixture: ComponentFixture<ProcesoCalculoPlanillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcesoCalculoPlanillaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcesoCalculoPlanillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
