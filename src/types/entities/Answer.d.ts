interface Answer {
    id: number;
    text: string;
    questionSessionHash: string;
    user: User;
    question: Question;
    userId: number;
    questionKey: string;
}
