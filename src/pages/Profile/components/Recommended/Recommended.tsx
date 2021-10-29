import { User } from "../../../../store/ducks/user/contracts/state";

import testAvatar from "../../../../assets/images/test-avatars/avatar-3.jpg";
import testAvatar2 from "../../../../assets/images/test-avatars/avatar-2.jpg";

import s from "./Recommended.module.scss";
import { RecommendedCard } from "./RecommendedCard/RecommendedCard";
import { Recommendation } from "./Recommendation/Recommendation";
import { useState } from "react";
import { IInfoBar, InfoBar } from "../../../../shared/Global/InfoBar/InfoBar";

interface Props {
  user: User;
}

export const Recommended = ({ user }: Props) => {
  const recommended = [
    {
      title: "Питание",
      amount: 3,
      color: "#E2D341",
    },
    {
      title: "Тренировки",
      amount: 2,
      color: "green",
    },
  ];
  const recommendations = [
    {
      avatar: testAvatar,
      name: "Марк Никонов",
      post: "диетолог",
      profileLink: "9129381984",
    },
    {
      avatar: testAvatar2,
      name: "Полина Кондратьева",
      post: "эндокринолог",
      profileLink: "9129381984",
    },
  ];

  const [active, setActive] = useState<number>(0);
  const recommendationsFilter = recommendations.filter((_, i) => i === active);

  const infoBar: IInfoBar = {
    title: "У вас нет рекомендаций",
    text: "Для появлений рекомендаций проведите встречу со сппециалистом.",
    bottomLink: "Записаться на видеоконсультацию",
    href: "/video",
  };

  return (
    <>
      <div className={s.recommended}>
        <InfoBar infoBar={infoBar} />
        {/* <div className={s.recommended__cards}>
          {recommended.map((card, i) => (
            <RecommendedCard
              setActive={setActive}
              active={active}
              key={card.title}
              options={card}
              i={i}
            />
          ))}
        </div>
        <div className={s.recommended__card__content}>
          {recommendationsFilter.map((recommendation) => (
            <Recommendation
              key={recommendation.name}
              options={recommendation}
            />
          ))}
        </div> */}
      </div>
    </>
  );
};
