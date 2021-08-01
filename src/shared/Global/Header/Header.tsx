import React, { Dispatch, SetStateAction } from 'react'

import s from './Header.module.scss'
import notificationImg from '../../../assets/icons/header/notification.svg'
import chatImg from '../../../assets/icons/header/chat.svg'
interface Props {
  page: string
  setSidebarNotificationsOpen: Dispatch<SetStateAction<boolean>>
  setSidebarChatOpen: Dispatch<SetStateAction<boolean>>
}

export const Header = ({
  page,
  setSidebarNotificationsOpen,
  setSidebarChatOpen,
}: Props) => {
  return (
    <header className={s.header}>
      <div className={s.header__wrapper}>
        <div className={s.header__title}>
          <h2>{page}</h2>
        </div>
        <div className={s.header__links}>
          <div className={s.header__link}>
            <a onClick={() => setSidebarNotificationsOpen(true)} href="#">
              <img src={notificationImg} alt="уведомления" />
            </a>
          </div>
          <div
            onClick={() => setSidebarChatOpen(true)}
            className={s.header__link}
          >
            <a href="#">
              <img src={chatImg} alt="чат" />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
