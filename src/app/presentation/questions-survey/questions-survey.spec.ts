import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsSurvey } from './questions-survey';

describe('QuestionsSurvey', () => {
  let component: QuestionsSurvey;
  let fixture: ComponentFixture<QuestionsSurvey>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionsSurvey]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionsSurvey);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
