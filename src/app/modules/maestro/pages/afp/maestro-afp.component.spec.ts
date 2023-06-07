import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroAfpComponent } from './maestro-afp.component';

describe('MaestroAfpComponent', () => {
  let component: MaestroAfpComponent;
  let fixture: ComponentFixture<MaestroAfpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaestroAfpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaestroAfpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
