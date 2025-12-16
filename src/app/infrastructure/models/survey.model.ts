// Interfaces based on your JSON
export interface Question {
  id: number;
  text: string;
  min: number;
  max: number;
}

export interface SurveySection {
  section: string;
  questions: Question[];
}

// The Target Payload Structure
export interface SurveyPayload {
  // respondent: RespondentPayload;
  answers: AnswerPayload[];
}

export interface RespondentPayload {
  email: string;
  ageRange: string;      // Calculated from 'age' number
  genderIdentity: string; // Mapped from 'gender'
  educationLevel?: string;
  workModality?: string;
  yearsExperienceTotal?: number;
  yearsExperienceCurrent?: number;
  teamRole?: string;
  country?: string;
}

export interface AnswerPayload {
  questionId: number;
  scoreValue: number | null;
  textValue: string | null;
}

// The Input Source Structure (extending our previous form)
export interface RespondentSource {
  name: string;
  email: string;
  age: number;
  gender: string;
  role: string;
  // Assuming we added these new fields to the registration form:
  education?: string; 
  modality?: string;
  totalExp?: number;
  currentExp?: number;
  country?: string;
}