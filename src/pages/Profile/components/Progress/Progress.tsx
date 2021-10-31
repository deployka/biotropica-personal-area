import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import { ProgressCard } from './ProgressCard/ProgressCard';

import s from './Progress.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectProgressData } from '../../../../store/ducks/progress/selectors';
import { Progress as IProgress } from '../../../../store/ducks/progress/contracts/state';
import { useEffect } from 'react';
import { fetchProgressData } from '../../../../store/ducks/progress/actionCreators';

interface Props {}

export const Progress = ({}: Props) => {
  const dispatch = useDispatch();

  const progress: IProgress[] = useSelector(selectProgressData) || [];
  useEffect(() => {
    dispatch(fetchProgressData());
  }, []);
  return (
    <>
      <PerfectScrollbar>
        <div className={s.progress}>
          {!!progress.length &&
            progress.map((card: IProgress) => (
              <ProgressCard key={card.id} card={card} />
            ))}
          {!progress.length && (
            <div className={s.progress__info}>Вы еще не добавляи свои фото</div>
          )}
        </div>
      </PerfectScrollbar>
    </>
  );
};
