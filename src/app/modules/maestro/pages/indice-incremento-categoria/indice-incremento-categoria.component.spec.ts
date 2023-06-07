import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiceIncrementoCategoriaComponent } from './indice-incremento-categoria.component';

describe('IndiceIncrementoCategoriaComponent', () => {
  let component: IndiceIncrementoCategoriaComponent;
  let fixture: ComponentFixture<IndiceIncrementoCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndiceIncrementoCategoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndiceIncrementoCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
