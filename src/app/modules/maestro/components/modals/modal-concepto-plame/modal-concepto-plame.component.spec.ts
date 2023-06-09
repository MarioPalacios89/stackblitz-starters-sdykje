import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConceptoPlameComponent } from './modal-concepto-plame.component';

describe('ModalConceptoPlameComponent', () => {
  let component: ModalConceptoPlameComponent;
  let fixture: ComponentFixture<ModalConceptoPlameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConceptoPlameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalConceptoPlameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
