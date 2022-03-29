import React, { useState } from 'react';
import moment from 'moment';

import s from './Post.module.scss';

interface Props2 {
    full: boolean;
}

const Text = ({ full }: Props2) => {
  return <a>{full ? 'скрыть' : 'читать все'}</a>;
};

interface Props {
    title: string,
    description: string,
    date: string,
}

export const Post = (props: Props) => {
  const {
    title,
    description,
    date,
  } = props;

  const [full, setFull] = useState<boolean>(false);

  function openFull() {
    setFull(!full);
  }

  return (
    <div className={s.post}>
      <div className={s.title}>
        <h4>{title}</h4>
      </div>
      <div className={`${full ? s.full : ''} ${s.text} `}>
        <p>
          {description}
        </p>
      </div>
      <div className={s.info}>
        <div className={s.date}>
          <p>
            {
              date
                ? moment(new Date(date)).format('D MMMM YYYY')
                : ''
            }
          </p>
        </div>
        {
          description.length > 250 &&
            <div className={s.link} onClick={openFull}>
              <Text full={full} />
            </div>
        }
      </div>
    </div>
  );
};
