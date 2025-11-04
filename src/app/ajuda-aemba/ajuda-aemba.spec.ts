import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjudaAemba } from './ajuda-aemba';

describe('AjudaAemba', () => {
  let component: AjudaAemba;
  let fixture: ComponentFixture<AjudaAemba>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjudaAemba]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjudaAemba);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
