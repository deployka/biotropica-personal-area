import classNames from "classnames";
import s from "./PrintedMessage.module.scss";
import React, {useState} from "react";

export function PrintedMessage() {
    const [dots, setDots] = useState<string>('.');
    setTimeout(() => {
        const newDots = `${dots}.`;
        if(newDots.length > 3) {
            setDots('.')
        } else {
            setDots(newDots)
        }
    }, 1000);

    return <div className={classNames(s.message, s.message__type__typing)}>
        Печатает{dots}
    </div>
}
