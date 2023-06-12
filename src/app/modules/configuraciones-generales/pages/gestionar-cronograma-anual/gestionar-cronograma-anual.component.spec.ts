import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarCronogramaAnualComponent } from './gestionar-cronograma-anual.component';

describe('GestionarCronogramaAnualComponent', () => {
  let component: GestionarCronogramaAnualComponent;
  let fixture: ComponentFixture<GestionarCronogramaAnualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarCronogramaAnualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarCronogramaAnualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
