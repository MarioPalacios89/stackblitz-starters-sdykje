import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoServidorPublicoComponent } from './proceso-servidor-publico.component';

describe('ProcesoServidorPublicoComponent', () => {
  let component: ProcesoServidorPublicoComponent;
  let fixture: ComponentFixture<ProcesoServidorPublicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcesoServidorPublicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcesoServidorPublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
