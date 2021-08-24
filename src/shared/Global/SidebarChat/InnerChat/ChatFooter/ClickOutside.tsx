import React, {ReactElement, useEffect} from 'react';

type Props = {
    children: ReactElement;
    onClickOutside: () => void
}

export function ClickOutside(props: Props) {
    const  wrapperRef = React.createRef<HTMLDivElement>();
    function handleClickOutside(event: MouseEvent) {
        if (wrapperRef && !wrapperRef.current?.contains(event.target as Node)) {
            props.onClickOutside();
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    })

    return <div ref={wrapperRef}>{props.children}</div>
}
