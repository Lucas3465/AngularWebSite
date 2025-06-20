import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Menuhamburguesa } from './menuhamburguesa';

describe('Menuhamburguesa', () => {
  let component: Menuhamburguesa;
  let fixture: ComponentFixture<Menuhamburguesa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Menuhamburguesa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Menuhamburguesa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
