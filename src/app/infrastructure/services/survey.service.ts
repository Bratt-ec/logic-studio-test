import { Injectable, signal } from '@angular/core';
import { Respondent } from '../models/respondent.model';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {

  protected _respondent = signal<Respondent | null>(null)

  setRespondent(respondent: Respondent) {
    this._respondent.set(respondent)
  }

  get respondent() {
    return this._respondent()
  }
}
