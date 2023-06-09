import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalIndiceIncrementoCategoriaComponent } from './modal-indice-incremento-categoria.component';

describe('ModalIndiceIncrementoCategoriaComponent', () => {
  let component: ModalIndiceIncrementoCategoriaComponent;
  let fixture: ComponentFixture<ModalIndiceIncrementoCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalIndiceIncrementoCategoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalIndiceIncrementoCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
