import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitSurvey } from './init-survey';

describe('InitSurvey', () => {
  let component: InitSurvey;
  let fixture: ComponentFixture<InitSurvey>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitSurvey]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitSurvey);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
