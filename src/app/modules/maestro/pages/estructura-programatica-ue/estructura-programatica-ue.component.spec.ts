import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstructuraProgramaticaUeComponent } from './estructura-programatica-ue.component';

describe('EstructuraProgramaticaUeComponent', () => {
  let component: EstructuraProgramaticaUeComponent;
  let fixture: ComponentFixture<EstructuraProgramaticaUeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstructuraProgramaticaUeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstructuraProgramaticaUeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
