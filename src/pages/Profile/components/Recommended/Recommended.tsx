import { User } from '../../../../store/ducks/user/contracts/state';

import testAvatar from '../../../../assets/images/test-avatars/avatar-3.jpg';

import s from './Recommended.module.scss';
import { RecommendedCard } from './RecommendedCard/RecommendedCard';
import { Recommendation } from './Recommendation/Recommendation';

interface Props {
  user: User;
}

export const Recommended = ({ user }: Props) => {
  const recommendedCards = [
    {
      title: 'Питание',
      amount: 3,
      color: '#E2D341',
    },
    {
      title: 'Тренировки',
      amount: 2,
      color: 'green',
    },
  ];
  const recommendations = [
    {
      avatar: testAvatar,
      name: 'Марк Никонов',
      post: 'диетолог',
      profileLink: '9129381984',
    },
  ];
  return (
    <div className={s.recommended}>
      <div className={s.recommended__cards}>
        {recommendedCards.map((card) => (
          <RecommendedCard options={card} />
        ))}
      </div>
      <div className={s.recommended__card__content}>
        {recommendations.map((recommendation) => (
          <Recommendation options={recommendation} />
        ))}
      </div>
    </div>
  );
};
