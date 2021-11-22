interface Question {
    id: number;
    key: string;
    title: string;
    description: string;
    order: number;
    condition: QuestionCondition;
    allowedAnswers: string[];
    extended: boolean;
    type: QuestionType
}

type QuestionType = 'text'|'number'|'select'|'multiselect'

interface QuestionCondition {
    compareType: 'eq' | 'ne' | 'gt' | 'lt' | 'ge' | 'le';
    questionKey: string;
    expectedValue: string;
}