import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroBancoComponent } from './maestro-banco.component';

describe('MaestroBancoComponent', () => {
  let component: MaestroBancoComponent;
  let fixture: ComponentFixture<MaestroBancoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaestroBancoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaestroBancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
