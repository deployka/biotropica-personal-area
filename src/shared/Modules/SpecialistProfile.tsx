import React from 'react';
import s from './SpecialistProfile.module.scss';
import {AppModule} from "./AppModule";

export type SpecialistProfileProps = {
    id: string;
    className?: string;
};

export function SpecialistProfile(props: SpecialistProfileProps) {
    if(!process.env.REACT_APP_SPECIALIST_PROFILE_URL) {
        throw new Error('Добавьте REACT_APP_SPECIALIST_PROFILE_URL в .env')
    }
    return <AppModule
        className={props.className}
        url={process.env.REACT_APP_SPECIALIST_PROFILE_URL + '/' + props.id}
    />
}