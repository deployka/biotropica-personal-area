import React, {useState} from 'react';
import s from './Zoom.module.scss';
import {AppModule} from "./AppModule";

export type ZoomProps = {
    meetingNumber: number;
    password: string;
    username: string;
    role: number;
    className?: string;
};

export function Zoom(props: ZoomProps) {
    const [mediaAccess, setMediaAccess] = useState(false);
       navigator.mediaDevices.getUserMedia({ audio: true, video: true })
           .then(r => {
               setMediaAccess(true);
               console.log('result', r)
           })
           .catch(e => {
               setMediaAccess(false);
               console.log('error', e)
           })

    if(!mediaAccess) {
        return <div>
            Для проведения видеоконсультации необходимо разрешить браузеру использовать данные камеры и микрофона
        </div>
    }

    return <AppModule
        allow="camera;microphone"
        className={props.className}
        url={process.env.REACT_APP_ZOOM_FRONT_URL as string}
        params={{
            meetingNumber: props.meetingNumber.toString(),
            password: props.password,
            username: props.username,
            role: props.role.toString(),
        }}
    />
}
