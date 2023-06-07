import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroConceptoMcppComponent } from './maestro-concepto-mcpp.component';

describe('MaestroConceptoMcppComponent', () => {
  let component: MaestroConceptoMcppComponent;
  let fixture: ComponentFixture<MaestroConceptoMcppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaestroConceptoMcppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaestroConceptoMcppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
