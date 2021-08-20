import s from './Progress.module.scss';

interface Progress {
  options: any;
}
export const Progress = ({ options }: Progress) => {
  const { current, of } = options;
  const percantage = Math.round(((current - 1) / of) * 100);
  return (
    <div className={s.progress}>
      <div className={s.progress__info}>
        <div className={s.progress__number}>
          <span className={s.progress__number__current}>{current}</span>
          {'  '}/{'  '}
          <span className={s.progress__number__of}>{of}</span>
        </div>
        <div className={s.progress__percentage}>{percantage}%</div>
      </div>
      <progress
        value={percantage}
        max="100"
        className={s.progress__bar}
      ></progress>
    </div>
  );
};
