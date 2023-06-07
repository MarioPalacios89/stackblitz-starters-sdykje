import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroClasificadorGastoComponent } from './maestro-clasificador-gasto.component';

describe('MaestroClasificadorGastoComponent', () => {
  let component: MaestroClasificadorGastoComponent;
  let fixture: ComponentFixture<MaestroClasificadorGastoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaestroClasificadorGastoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaestroClasificadorGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
