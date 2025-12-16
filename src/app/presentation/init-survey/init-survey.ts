import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions } from "@angular/material/card";
import { Respondent } from '../../infrastructure/models/respondent.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { SurveyService } from '../../infrastructure/services/survey.service';
import { AppRoutes } from '../../core/routes/app-routes';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';

@Component({
  selector: 'app-init-survey',
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, ReactiveFormsModule, MatFormFieldModule, MatCardActions, MatSelectModule,MatInputModule, MatIconModule,MatButtonModule],
  templateUrl: './init-survey.html',
  styleUrl: './init-survey.scss',
})
export class InitSurvey {

  private fb = inject(FormBuilder);
  private location = inject(Location);
  private router = inject(Router);
  private _survey = inject(SurveyService);

  respondentForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
    gender: ['', Validators.required],
    role: ['', Validators.required]
  });

  genders = ['Femenino', 'Masculino', 'No binario', 'Prefiero no decirlo'];

  onSubmit() {
    if (this.respondentForm.valid) {
      const formData: Respondent = this.respondentForm.value;
      console.log('Form Submitted:', formData);
      this._survey.setRespondent(formData);
      this.router.navigate([AppRoutes.questions]);
    }
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.respondentForm.get(controlName);
    return !!(control?.hasError(errorName) && control?.touched);
  }


  goBack(){
    this.location.back();
  }
}
