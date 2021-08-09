import s from './ProgressCard.module.scss';

interface Props {
  options: any;
}

export const ProgressCard = ({ options }: Props) => {
  return (
    <div className={s.progress__card}>
      <div className={s.card__imges}>
        {options.images.map((image: any) => (
          <div className={s.card__img__wrapper}>
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
