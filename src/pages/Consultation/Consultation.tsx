import React, {useEffect, useState} from 'react';
import s from './Consultation.module.scss'
import {Zoom} from "../../shared/Modules/Zoom";
import {useSelector} from "react-redux";
import {selectUserData} from "../../store/ducks/user/selectors";
import {useParams} from "react-router";
import ConsultationService from "../../services/ConsultationService";
import {Consultation} from "../../store/ducks/consultation/contracts/state";

export function ConsultationPage() {
    const {id} = useParams<{id: string}>();
    const [consultation, setConsultation] = useState<Consultation|null>();
    useEffect(() => {
        ConsultationService
            .getOne(+id)
            .then(res => {
                console.log('RES', res);
                setConsultation(res.data)
            })
    }, [])

    const currentUser = useSelector(selectUserData);
    if(!currentUser || !consultation) {
        return null;
    }

    console.log('consultation', consultation)

    const username = currentUser.name + ' ' + currentUser.lastname;

    return <Zoom
        className={s.consultation}
        meetingNumber={consultation.meetingNumber}
        password={consultation.meetingPassword}
        role={0}
        username={username}
    />
}