import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Button from '../../../../components/Button/Button';
import Modal from '../../../../shared/Global/Modal/Modal';
import Confirm from '../../../../shared/Global/Modal/Confirm/Confirm';
import { Textarea } from '../../../../shared/Form/Textarea/Textarea';
import { Input } from '../../../../shared/Form/Input/Input';
import Divider from '../../../../components/Divider/Divider';
import { Course } from './../../../../@types/entities/Specialist';
import { ChangeCourseDto } from '../../../../@types/dto/specialists/change-courses.dto';

import s from './Courses.module.scss';

type Props = {
  courses: Course[];
  specialistId: UniqueId;
  onChange: (data: ChangeCourseDto) => void;
};

export const Courses = ({ courses, onChange }: Props) => {
  const [coursesList, setCoursesList] = useState(
    courses.map((course: Course, i: number) => ({
      ...course,
      id: i + 1,
    })),
  );

  const [isDataChanged, setIsDataChanged] = useState(false);
  const [deletedCourseId, setDeletedCourseId] = useState<number | null>(null);

  const closeDeleteModal = () => {
    setDeletedCourseId(null);
  };

  const handleChange = (
    id: number,
    title: string,
    description: string,
    date: string,
  ) => {
    setIsDataChanged(true);

    const filteredCourses = coursesList.filter(
      (course: Course) => course.id !== id,
    );

    let editedCourse = coursesList.find((course: Course) => course.id === id);

    editedCourse = {
      id,
      title: title,
      description: description,
      date: date,
    };

    const newCourses = [...filteredCourses, editedCourse].sort(
      (a, b) => a.id - b.id,
    );

    setCoursesList(newCourses);
  };

  const handleClickAddCourse = () => {
    setCoursesList([
      ...coursesList,
      {
        id: Number(courses.length) + 1,
        title: '',
        description: '',
        date: moment().toISOString(),
      },
    ]);
  };

  const handleClickDeleteBtn = (id: number) => {
    if (coursesList.length === courses.length) {
      setDeletedCourseId(id);
    } else {
      const editedCourses = coursesList.filter(
        (course: Course) => course.id !== id,
      );
      setCoursesList(editedCourses);
    }
  };

  const handleClickDeleteCourse = () => {
    if (!deletedCourseId) return;
    const editedCourses = coursesList.filter(
      (course: Course) => course.id !== deletedCourseId,
    );
    console.log(editedCourses);

    setCoursesList(editedCourses);
    closeDeleteModal();

    const coursesWithoutIds = editedCourses.map((course: Course) => ({
      title: course.title,
      description: course.description,
      date: course.date,
    }));

    onChange({
      courses: coursesWithoutIds,
    });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const coursesWithoutIds = coursesList.map((course: Course) => ({
      title: course.title,
      description: course.description,
      date: course.date,
    }));

    onChange({
      courses: coursesWithoutIds,
    });
  };

  const isSubmitDisabled = !!coursesList.find(
    (course: Course) => course.title === '' || course.description === '',
  );

  return (
    <>
      <div className={s.courses}>
        <form onSubmit={handleSubmit}>
          <div className={s.form}>
            {coursesList.map((course: Course) => (
              <div key={course.id}>
                <div className={s.course}>
                  <div className={s.course__inputs}>
                    <Input
                      placeholder="Название"
                      value={course.title || ''}
                      name="title"
                      onChange={e =>
                        handleChange(
                          course.id,
                          e.target.value,
                          course.description,
                          course.date,
                        )
                      }
                    />
                    <Textarea
                      value={course.description}
                      rows={5}
                      placeholder="Описание"
                      name="description"
                      onChange={e =>
                        handleChange(
                          course.id,
                          course.title,
                          e.target.value,
                          course.date,
                        )
                      }
                    />
                  </div>
                  <Button
                    className={s.course__closeBtn}
                    onClick={() => handleClickDeleteBtn(course.id)}
                  >
                    x
                  </Button>
                </div>
                <div className={s.divider}>
                  <Divider />
                </div>
              </div>
            ))}
            <Button
              isFunctional
              className={s.addButton}
              onClick={handleClickAddCourse}
            >
              <span>+</span>
              <span>Добавить курс</span>
            </Button>
            <div className={s.button__wrapper}>
              <Button className={s.cancelBtn}>
                <Link to={'/profile/'}>Отмена</Link>
              </Button>
              <Button
                type="submit"
                className={s.submitBtn}
                isDisabled={isSubmitDisabled || !isDataChanged}
                isPrimary
              >
                Сохранить
              </Button>
            </div>
          </div>
        </form>
      </div>
      <Modal isOpened={!!deletedCourseId} close={() => closeDeleteModal()}>
        <Confirm
          accept={handleClickDeleteCourse}
          reject={() => closeDeleteModal()}
        >
          Вы уверены, что хотите удалить курс?
        </Confirm>
      </Modal>
    </>
  );
};
