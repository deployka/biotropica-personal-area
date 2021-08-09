import { ProgressCard } from './ProgressCard/ProgressCard';
import s from './Progress.module.scss';
import testImg from '../../../../assets/images/test-progress/progress.jpg';
import testImg2 from '../../../../assets/images/test-progress/progress2.jpg';
import testImg3 from '../../../../assets/images/test-progress/progress3.jpg';
import testImg4 from '../../../../assets/images/test-progress/progress4.jpg';
import testImg5 from '../../../../assets/images/test-progress/progress5.jpg';
import testImg6 from '../../../../assets/images/test-progress/progress6.jpg';
import testImg7 from '../../../../assets/images/test-progress/progress7.jpg';
import testImg8 from '../../../../assets/images/test-progress/progress8.jpg';
import testImg9 from '../../../../assets/images/test-progress/progress9.jpg';
import { User } from '../../../../store/ducks/user/contracts/state';

interface Props {
  user: User;
}

export const Progress = ({ user }: Props) => {
  const progressCards = [
    {
      images: [testImg, testImg8, testImg4],
      date: '5 дней, 13 июня 2021г.',
    },
    {
      images: [testImg9, testImg7, testImg6],
      date: '12 дней, 1 августа 1993г.',
    },
    {
      images: [testImg5, testImg9, testImg7],
      date: '1 день, 23 августа 2025г.',
    },
  ];
  return (
    <div className={s.progress}>
      {progressCards.map((card) => (
        <ProgressCard options={card} />
      ))}
    </div>
  );
};
