import { AnswerPayload, RespondentSource, SurveyPayload } from "../models/survey.model";

export class SurveyMapper {
    static generatePayload(surveyFormData: any): SurveyPayload {
        return {
            answers: this.mapAnswers(surveyFormData)
        };
    }

    private static mapRespondent(data: RespondentSource) {
        return {
            email: data.email,
            ageRange: this.calculateAgeRange(data.age), // Transform logic
            genderIdentity: data.gender,
            teamRole: data.role,

            // Mapping fields if they exist, or providing defaults if form was simple
            educationLevel: data.education || 'Not Specified',
            workModality: data.modality || 'On-site',
            yearsExperienceTotal: data.totalExp || 0,
            yearsExperienceCurrent: data.currentExp || 0,
            country: data.country || 'Unknown'
        };
    }

    private static mapAnswers(surveyFormData: any): AnswerPayload[] {
        const answers: AnswerPayload[] = [];

        // The survey form is nested: { section_0: { q_1: 5 }, section_1: { q_20: "Text" } }
        // We need to flatten this structure.

        Object.values(surveyFormData).forEach((section: any) => {
            Object.keys(section).forEach((key) => {

                // Check if key matches pattern 'q_{id}'
                if (key.startsWith('q_')) {
                    const id = parseInt(key.split('_')[1], 10);
                    const val = section[key];

                    // Determine if it is a Score or Text based on value type
                    const isText = typeof val === 'string';

                    answers.push({
                        questionId: id,
                        scoreValue: isText ? null : Number(val),
                        textValue: isText ? val : null
                    });
                }
            });
        });

        return answers;
    }

    // Helper to convert numeric Age to Range String
    private static calculateAgeRange(age: number): string {
        if (age < 18) return 'Under 18';
        if (age >= 18 && age <= 25) return '18-25';
        if (age >= 26 && age <= 35) return '26-35';
        if (age >= 36 && age <= 45) return '36-45';
        if (age >= 46 && age <= 55) return '46-55';
        return '55+';
    }
}