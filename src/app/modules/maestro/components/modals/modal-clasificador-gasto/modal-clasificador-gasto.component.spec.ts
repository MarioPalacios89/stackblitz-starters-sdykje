import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalClasificadorGastoComponent } from './modal-clasificador-gasto.component';

describe('ModalClasificadorGastoComponent', () => {
  let component: ModalClasificadorGastoComponent;
  let fixture: ComponentFixture<ModalClasificadorGastoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalClasificadorGastoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalClasificadorGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
