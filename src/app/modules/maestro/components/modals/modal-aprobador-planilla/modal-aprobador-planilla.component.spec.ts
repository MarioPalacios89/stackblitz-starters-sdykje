import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAprobadorPlanillaComponent } from './modal-aprobador-planilla.component';

describe('ModalAprobadorPlanillaComponent', () => {
  let component: ModalAprobadorPlanillaComponent;
  let fixture: ComponentFixture<ModalAprobadorPlanillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAprobadorPlanillaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAprobadorPlanillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
