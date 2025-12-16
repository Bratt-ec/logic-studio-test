import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SurveyService } from '../../infrastructure/services/survey.service';
import { AppRoutes } from '../routes/app-routes';

export const surveyGuard: CanActivateFn = (route, state) => {

  const _survey = inject(SurveyService);
  const router = inject(Router);

  if(!_survey.respondent) {
    router.navigate([AppRoutes.welcome]);
    return false;
  }

  return true
};
