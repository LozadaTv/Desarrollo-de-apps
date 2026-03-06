import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Descripcion } from './descripcion';

describe('Descripcion', () => {
  let component: Descripcion;
  let fixture: ComponentFixture<Descripcion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Descripcion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Descripcion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
