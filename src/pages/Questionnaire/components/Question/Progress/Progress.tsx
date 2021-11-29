import s from './Progress.module.scss';

interface Progress {
  options: any; //!FIXME:
}
export const Progress = ({ options }: Progress) => {
  const { currentIndex, total } = options;
  const percantage = Math.round(((currentIndex) / total) * 100);
  return (
    <div className={s.progress}>
      <div className={s.progress__info}>
        <div className={s.progress__number}>
          <span className={s.progress__number__current}>{currentIndex + 1}</span>
          {'  '}/{'  '}
          <span className={s.progress__number__of}>{total}</span>
        </div>
        <div className={s.progress__percentage}>{percantage}%</div>
      </div>
      <progress
        value={percantage}
        max='100'
        className={s.progress__bar}
      ></progress>
    </div>
  );
};
