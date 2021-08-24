import classNames from 'classnames';
import s from './DialogList.module.scss';

interface Props {
  options: any;
  onClick: () => void;
}

export const DialogItem = ({ options, onClick }: Props) => {
  return (
    <div className={s.message} onClick={() => onClick()}>
      <div className={s.message__avatar__wrapper}>
        <img src={options.image} className={s.message__avatar}></img>
      </div>
      <div className={s.message__info}>
        <div className={s.message__username}>{options.name}</div>
        <div className={s.message__content}>{options.content}</div>
      </div>
      <div
        className={classNames(s.message__status, {
          [s.new]: options.status,
        })}
      ></div>
    </div>
  );
};
