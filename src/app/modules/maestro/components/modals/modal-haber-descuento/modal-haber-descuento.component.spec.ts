import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHaberDescuentoComponent } from './modal-haber-descuento.component';

describe('ModalHaberDescuentoComponent', () => {
  let component: ModalHaberDescuentoComponent;
  let fixture: ComponentFixture<ModalHaberDescuentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalHaberDescuentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalHaberDescuentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
