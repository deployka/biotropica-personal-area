import React from 'react';
import { Course } from '../../../@types/entities/Specialist';

import s from './List.module.scss';
import { Post } from './Post';

type Props = {
  coursesList: Course[];
};

export const SpecialistCoursesList = ({ coursesList }: Props) => {
  return (
    <div className={s.courses}>
      <div className={s.title}>
        <h3>Курсы повышения квалификации</h3>

        <div className={s.postList}>
          {coursesList.length === 0 && (
            <p className={s.emptyData}>Нет данных</p>
          )}
          {coursesList.length !== 0 &&
            coursesList.map((course, i) => (
              <Post
                key={i}
                title={course.title}
                description={course.description}
                date={course.date}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
