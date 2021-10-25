import moment from 'moment';
import { useModal } from '../../../../../hooks/UseModal';
import { ModalName } from '../../../../../providers/ModalProvider';
import {
  Photo,
  Progress,
} from '../../../../../store/ducks/progress/contracts/state';
import s from './ProgressCard.module.scss';

interface Props {
  card: Progress;
}

export const ProgressCard = ({ card }: Props) => {
  const { openModal } = useModal();

  const photos: Photo[] = card.photos;

  return (
    <div className={s.progress__card}>
      <div className={s.card__imges}>
        {card.photos.map((image: Photo, i: number) => (
          <div key={image.filename} className={s.card__img__wrapper}>
            <img
              onClick={() =>
                openModal(ModalName.MODAL_PROGRESS_PHOTO_SLIDER, {
                  photos,
                  createdAt: card.createdAt,
                  i,
                })
              }
              src={process.env.REACT_APP_BACKEND_URL + '/' + image.filename}
              className={s.card__img}
            />
          </div>
        ))}
      </div>
      <div className={s.card__date}>
        {moment(new Date(card.createdAt), 'YYYYMMDD').fromNow()},{' '}
        {moment(card.createdAt).format('Do MMMM YYYY г.')}
      </div>
    </div>
  );
};
