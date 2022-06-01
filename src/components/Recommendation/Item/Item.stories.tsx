import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { RecommendationItem, RecommendationItemProps } from './Item';

export default {
  component: RecommendationItem,
  title: 'src/components/recommendations/RecommendationItem',
} as Meta;

const Template: ComponentStory<typeof RecommendationItem> = (
  args: RecommendationItemProps,
) => <RecommendationItem {...args} />;
export const DefaultRecommendationItem = Template.bind({});
const props: Partial<RecommendationItemProps> = {
  title: 'Как правильно какать',
  text: '<h2>Сгладить изгиб между прямой кишкой и анальным каналом помогает положение сидя, причем чем более глубоко человек сядет, тем легче каловым массам будет спуститься к анальному отверстию.</h2><p><br></p><p>Таким образом, лучшее положение для дефекации — сидя на корточках.</p><p>Хотя находиться в такой позе может быть не очень комфортно, она позволяет опорожнить кишечник быстро и без дополнительных усилий.</p><p><br></p><p>Несмотря на пользу для организма, многие не готовы отказываться от привычного унитаза в пользу напольной конструкции.</p><p><br></p><p><u>В таком случае принять нужную позу поможет подставка для ног</u>.</p><p><br></p><p>Есть и другой способ смягчить <em>аноректальный</em> угол — занять позу мыслителя, согнув верхнюю часть тела.</p><p><br></p><p>Исследования показали, что <strong>11 из 22 </strong>добровольцев, которые испытывали проблемы с дефекацией в положении сидя, смогли <u>полностью</u> опорожнить кишечник в этой позе.</p>',
  createdAt: new Date(),
  onDelete: () => {
    //
  },
  onEdit: () => {
    //
  },
};

DefaultRecommendationItem.args = props;
