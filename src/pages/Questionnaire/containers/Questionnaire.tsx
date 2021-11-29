import React, {useEffect, useState} from 'react';
import {Question as QuestionComponent} from '../components/Question/Question';
import {Welcome} from '../components/Welcome/Welcome';

import s from './Questionnaire.module.scss';
import $api from '../../../http';
import {AxiosResponse} from 'axios';
import QuestionService from '../../../services/QuestionService';
import {progressSaga} from '../../../store/ducks/progress/sagas';

type Question = {
    title: string;
    type: 'select' | 'multiselect' | 'text' | 'number';
    key: string;
    allowedAnswers: string[] | null
};

const Questionnaire = () => {
    const [question, setQuestion] = useState<null | Question>(null);
    const [progress, setProgress] = useState({
        currentIndex: 1,
        total: 30,
    });

    useEffect(() => {
        fetchQuestion();
    }, [])

    if (!question) {
        return null;
    }

    async function fetchQuestion() {
        const {data: question} = await QuestionService.getNextQuestion();
        setQuestion(question);
    }

    async function giveAnswer(answer: CreateAnswerDto) {
        await QuestionService.answer(answer);
        await fetchQuestion();
    }

    const options = question.allowedAnswers ? question.allowedAnswers.map(it => ({
        value: it,
        label: it
    })) : [];


    return (
        <div className={s.questionnaire}>
            {/*<Welcome />*/}

            <QuestionComponent
                progress={progress}
                title={question.title}
                type={question.type as Question['type']}
                options={options}
                onNext={(text) => {
                    giveAnswer({
                        text: text as string,
                        questionKey: question.key
                    })
                }}
                onPrev={() => {
                    setProgress({...progress, currentIndex: progress.currentIndex - 1});
                }}
            />
        </div>
    );
};
export default Questionnaire;
