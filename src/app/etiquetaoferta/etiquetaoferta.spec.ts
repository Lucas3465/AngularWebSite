import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Etiquetaoferta } from './etiquetaoferta';

describe('Etiquetaoferta', () => {
  let component: Etiquetaoferta;
  let fixture: ComponentFixture<Etiquetaoferta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Etiquetaoferta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Etiquetaoferta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
