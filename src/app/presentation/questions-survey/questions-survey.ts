import { ChangeDetectorRef, Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';

// Material Modules
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SurveySection } from '../../infrastructure/models/survey.model';
import { SurveyService } from '../../infrastructure/services/survey.service';
import { Router } from '@angular/router';
import { AppRoutes } from '../../core/routes/app-routes';

@Component({
  selector: 'app-questions-survey',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    MatButtonToggleModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './questions-survey.html',
  styleUrl: './questions-survey.scss',
})
export class QuestionsSurvey {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private cdRef = inject(ChangeDetectorRef);
  private _survey = inject(SurveyService);

  surveyData: SurveySection[] = [];
  surveyForm: FormGroup = this.fb.group({});

  constructor() {
    this.load()
  }

  async load() {
    this.surveyData = await this._survey.getAll()
    if (this.surveyData && this.surveyData.length > 0) {
      this.buildForm();
      this.cdRef.detectChanges();
    }
  }

  // Dynamic Form Builder
  private buildForm() {
    this.surveyData.forEach((section, index) => {
      const sectionGroup = this.fb.group({});

      section.questions.forEach(q => {
        const validators = [];
        validators.push(Validators.required);

        if (q.max > 0) {
          validators.push(Validators.min(q.min));
          validators.push(Validators.max(q.max));
        }

        sectionGroup.addControl(`q_${q.id}`, new FormControl('', validators));
      });

      this.surveyForm.addControl(`section_${index}`, sectionGroup);
    });
  }

  getSectionGroup(index: number): FormGroup {
    return this.surveyForm.get(`section_${index}`) as FormGroup;
  }

  getRange(min: number, max: number): number[] {
    const range = [];
    for (let i = min; i <= max; i++) {
      range.push(i);
    }
    return range;
  }

  async onSubmit() {
    if (this.surveyForm.valid) {
      const response = await this._survey.send(this.surveyForm.value)
      if (response) {
        this._survey.setRespondent(null)
        this.surveyForm.reset()
        this.router.navigate([AppRoutes.welcome])
      }
    }
  }

}
