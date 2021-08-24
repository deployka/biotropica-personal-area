import isToday from 'date-fns/isToday';
import isYesterday from 'date-fns/isYesterday';
import format from 'date-fns/format';
import ru from "date-fns/locale/ru";
import s from './Timemark.module.scss';
type Props = {
    time: string;
}

const NOW = new Date();

function getTimeText(time: string) {
    const timeObj = new Date(time);
    if(isToday(timeObj)) {
        return 'Сегодня'
    }
    if(isYesterday(timeObj)) {
        return 'Вчера'
    }

    return format(timeObj, 'dd MMMM', {
        locale: ru
    })
}

export function Timemark({time}: Props) {
    return <div className={s.timemark}><span>{getTimeText(time)}</span></div>
}
