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
      <div className={s.avatar}>
        <img
          src={(options.image && getMediaLink(options.image)) || defaultAvatar}
        />
      </div>
      <div className={s.info}>
        <div className={s.username}>
          <p>{options.name}</p>
        </div>
        <div className={s.content}>{options.content}</div>
      </div>
      <div
        className={classNames(s.status, {
          [s.new]: options.status,
        })}
      ></div>
    </div>
  );
};
