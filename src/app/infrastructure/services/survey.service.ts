import { inject, Injectable, signal } from '@angular/core';
import { Respondent } from '../models/respondent.model';
import { HttpClient } from '@angular/common/http';
import { Ui } from '../../core/services/ui';
import { lastValueFrom } from 'rxjs';
import { Api } from '../../api/api-routes';
import { SurveyMapper } from '../mapper/survey-mapper';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {

  protected _respondent = signal<Respondent | null>(null)
  private http = inject(HttpClient)
  private _ui = inject(Ui)

  setRespondent(respondent: Respondent | null) {
    this._respondent.set(respondent)
  }

  get respondent() {
    return this._respondent()
  }

  async getAll() {
    const load = this._ui.load()
    try {
      const response: any = await lastValueFrom(this.http.get(Api.questions))
      console.log("getAll()", response);

      if (!response.length) return []

      return response
    } catch (error) {
      return []
    } finally {
      load.close()
    }
  }

  async send(answers: any) {
    const load = this._ui.load()
    try {

      const payload = SurveyMapper.generatePayload(answers);

      const response: any = await lastValueFrom(this.http.post(Api.survey, {
        respondent: {
          email: this.respondent?.email,
          ageRange: `${this.respondent?.age}`,
          genderIdentity: this.respondent?.gender,
          teamRole: this.respondent?.role,
          fullName: this.respondent?.name
        },
        answers: payload.answers
      }))

      if (!response.success) return null

      return response
    } catch (error) {
      return null
    } finally {
      load.close()
    }
  }
}
