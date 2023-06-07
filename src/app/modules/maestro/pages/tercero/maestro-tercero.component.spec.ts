import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroTerceroComponent } from './maestro-tercero.component';

describe('MaestroTerceroComponent', () => {
  let component: MaestroTerceroComponent;
  let fixture: ComponentFixture<MaestroTerceroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaestroTerceroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaestroTerceroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
