import format from 'date-fns/format';
import React from "react";

type Props = {
    time: string;
}

export function MessageTime(props: Props) {
    const formattedTime = format(new Date(props.time), 'HH:mm')
    return <span className={'mr-2'}>{formattedTime}</span>
}
