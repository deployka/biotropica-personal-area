import s from "./ChatFooter.module.scss";
import React, {FocusEventHandler, RefObject, useEffect, useState} from "react";

type Props = {
    value: string;
    minRows: number;
    maxRows: number;
    placeholder?: string;
    onChange: (val: string) => void;
    onFocus: () => void;
    onBlur: () => void;
}

export function Textarea(props: Props) {
    const ref = React.createRef() as RefObject<HTMLTextAreaElement>;
    const [rows, setRows] = useState<number>(1);

    useEffect(() => {
        const textarea = ref.current;
        if(textarea) {
            const updatedRows = calculateNumberOfLines(textarea, props.minRows, props.maxRows, rows);
            if(updatedRows !== rows) {
                setRows(updatedRows);
            }
        }
    }, [props.value])

    return <textarea
        ref={ref}
        rows={rows}
        className={s.form__text}
        value={props.value}
        placeholder={props.placeholder}
        onChange={e => props.onChange(e.target.value)}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
    />
}

function calculateNumberOfLines(
    textarea: HTMLTextAreaElement,
    minRows: number,
    maxRows: number,
    currentRows: number,
): number {
    const rows = textarea.rows || minRows;
    const value = textarea.innerHTML;
    const height = textarea.clientHeight;
    const scrollHeight = textarea.scrollHeight;

    if(!value) {
        return minRows
    }

    if (maxRows && rows >= maxRows) {
        return maxRows;
    }

    if (rows < minRows) {
        return minRows;
    }

    if (scrollHeight > height) {
        const rowHeight = height / currentRows;

        return Math.ceil((scrollHeight) / rowHeight);
    }

    return rows;
}
