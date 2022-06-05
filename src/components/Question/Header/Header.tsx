import React from 'react'

import s from './Title.module.scss'

type Props = {
    title: string;
    questionNumber: number
}

export const Title = ({title, questionNumber}: Props) => {
  return (
    <div className={s.number}>
        <p>{questionNumber} вопрос</p>
      </div>
      <div className={s.title}>
        <p>{title}</p>
      </div>
      </div>
  )
}