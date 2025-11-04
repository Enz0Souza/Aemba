import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipeProjeto } from './participe-projeto';

describe('ParticipeProjeto', () => {
  let component: ParticipeProjeto;
  let fixture: ComponentFixture<ParticipeProjeto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipeProjeto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipeProjeto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
