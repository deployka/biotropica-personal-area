import { useModal } from '../../../../../hooks/UseModal';
import { ModalName } from '../../../../../providers/ModalProvider';
import { Photo } from '../PhotoSliderModal/PhotoSliderModal';
import s from './ProgressCard.module.scss';

interface Props {
  options: any;
}

export const ProgressCard = ({ options }: Props) => {
  const { setOpenModals } = useModal();

  const photos: Photo[] = [
    {
      src: 'https://i.ibb.co/nbcXV9h/photo-1589883661923-6476cb0ae9f2.jpg',
      title: 'cat1',
    },
    {
      src: 'https://i.ibb.co/tPX4dc1/tran-mau-tri-tam-Fbh-Nd-D1ow2g-unsplash.jpg',
      title: 'cat2',
    },
    {
      src: 'https://i.ibb.co/7CmKS27/kristina-yadykina-21-NRDb-MJF94-unsplash.jpg',
      title: 'cat3',
    },
  ];

  return (
    <div
      className={s.progress__card}
      onClick={() =>
        setOpenModals({
          [ModalName.MODAL_PROGRESS_PHOTO_SLIDER]: {
            open: true,
            props: { photos },
          },
        })
      }
    >
      <div className={s.card__imges}>
        {options.images.map((image: any) => (
          <div key={image} className={s.card__img__wrapper}>
            <img src={image} className={s.card__img} />
          </div>
        ))}
      </div>
      <div className={s.card__date}>
        Спустя{'  '} {options.date}
      </div>
    </div>
  );
};
