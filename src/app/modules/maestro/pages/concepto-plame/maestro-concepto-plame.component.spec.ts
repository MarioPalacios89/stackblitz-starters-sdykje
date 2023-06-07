import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroConceptoPlameComponent } from './maestro-concepto-plame.component';

describe('MaestroConceptoPlameComponent', () => {
  let component: MaestroConceptoPlameComponent;
  let fixture: ComponentFixture<MaestroConceptoPlameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaestroConceptoPlameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaestroConceptoPlameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
