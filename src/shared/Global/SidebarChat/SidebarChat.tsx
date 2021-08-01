import classNames from 'classnames';
import React, { Dispatch, SetStateAction } from 'react';
import s from './SidebarChat.module.scss';
import close from '../../../assets/icons/close-cross.svg';
import { BtnClose } from '../../buttons/BtnClose/BtnClose';
import testAvatar1 from '../../../assets/images/test-avatars/avatar-1.jpg';
import testAvatar2 from '../../../assets/images/test-avatars/avatar-2.jpg';
import testAvatar3 from '../../../assets/images/test-avatars/avatar-3.jpg';
import { OuterMessage } from './OuterMessage/OuterMessage';
import { InnerChat } from './InnerChat/InnerChat';
interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const SidebarChat = ({ open, setOpen }: Props) => {
  const messages = [
    {
      name: 'Глеб Воронин',
      image: testAvatar1,
      content: 'Добрый день!',
      status: true,
    },
    {
      name: 'Злата Воронцова',
      image: testAvatar2,
      content: 'Отличные рузультат. ',
      status: false,
    },
    {
      name: 'Марк Никонов',
      image: testAvatar3,
      content: 'Можно уточнить какие именно в виду имеете',
      status: false,
    },
  ];
  const testProfile = {
    name: 'Глеб Воронин',
    image: testAvatar1,
    post: 'фитнес инструктор',
  };
  return (
    <div
      className={classNames({
        [s.sidebar__chat__wrapper]: true,
        [s.open]: open,
      })}
    >
      <div className={s.sidebar__chat}>
        {/* <div className={s.sidebar__header}>
          <div className={s.sidebar__header__title}>Сообщения</div>
          <BtnClose />
        </div> */}
        {/* <div className={s.sidebar__messages}>
          {messages.map((message, index) => {
            return (
              <OuterMessage
                key={index}
                options={{
                  image: message.image,
                  name: message.name,
                  content: message.content,
                  status: message.status,
                }}
              />
            );
          })}
        </div> */}
        <InnerChat options={testProfile} />
      </div>
    </div>
  );
};
