import React, {useEffect} from 'react';
import s from './IFrame.module.scss';

export type AppModuleProps = {
    url: string;
    params?: {
        [key: string]: string;
    }
    events?: {
        [key: string]: (val: any) => void;
    }
    className?: string;
};

export function AppModule(props: AppModuleProps) {
    const myUrlWithParams = new URL(props.url);

    for(const key in props.params) {
        myUrlWithParams.searchParams.append(key, props.params[key]);
    }

    function handleEvent(event: {
        data: {
            message: string;
            value: any;
        }
    }) {
        for(const key in props.events) {
            if(key === event.data.message) {
                props.events[key](event.data.value);
            }
        }
    }

    useEffect(() => {
        window.addEventListener("message", handleEvent, false);
        return () => {
            window.removeEventListener('message', handleEvent);
        }
    }, [])



    return <iframe
        className={s.module + ' ' + props.className}
        src={myUrlWithParams.href}
    />
}
