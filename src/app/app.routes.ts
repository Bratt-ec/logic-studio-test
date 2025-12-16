import { Routes } from '@angular/router';
import { AppRoutes } from './core/routes/app-routes';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./presentation/welcome/welcome').then((m) => m.Welcome)
    },
    {
        path: AppRoutes.init,
        loadComponent: () => import('./presentation/init-survey/init-survey').then((m) => m.InitSurvey)
    },
    {
        path: AppRoutes.questions,
        loadComponent: () => import('./presentation/questions-survey/questions-survey').then((m) => m.QuestionsSurvey)
    }
];
