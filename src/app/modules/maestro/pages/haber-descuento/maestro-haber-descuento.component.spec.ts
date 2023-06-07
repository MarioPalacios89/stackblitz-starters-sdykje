import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroHaberDescuentoComponent } from './maestro-haber-descuento.component';

describe('MaestroHaberDescuentoComponent', () => {
  let component: MaestroHaberDescuentoComponent;
  let fixture: ComponentFixture<MaestroHaberDescuentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaestroHaberDescuentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaestroHaberDescuentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
