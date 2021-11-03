import classNames from 'classnames';
import s from './DialogList.module.scss';
import defaultAvatar from '../../../../assets/images/profile/default_avatar.png';
import { getMediaLink } from '../../../../utils/mediaHelper';
interface Props {
  options: any;
  onClick: () => void;
}

export const DialogItem = ({ options, onClick }: Props) => {
  return (
    <div className={s.message} onClick={() => onClick()}>
      <div className={s.message__avatar__wrapper}>
        <img
          src={(options.image && getMediaLink(options.image)) || defaultAvatar}
          className={s.message__avatar}
        />
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
