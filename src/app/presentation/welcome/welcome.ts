import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AppRoutes } from '../../core/routes/app-routes';

@Component({
  selector: 'app-welcome',
  imports: [MatCard, MatCardHeader, MatIcon, MatCardSubtitle, MatCardTitle, MatCardContent, MatCardActions, MatButtonModule],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
})
export class Welcome {

  private router = inject(Router)


  startSurvey() {
    this.router.navigate([AppRoutes.init])
  }
}
