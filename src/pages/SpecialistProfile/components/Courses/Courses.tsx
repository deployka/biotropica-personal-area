import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import s from './Courses.module.scss';

import Button from '../../../../components/Button/Button';
import Modal from '../../../../shared/Global/Modal/Modal';
import Confirm from '../../../../shared/Global/Modal/Confirm/Confirm';
// import { showSuccessMessage, showErrorMessage } from '../../../../components/notification/messages';
import { Loader } from '../../../../shared/Global/Loader/Loader';

import { Textarea } from '../../../../shared/Form/Textarea/Textarea';
import { Input } from '../../../../shared/Form/Input/Input';
import Divider from '../../../../components/Divider/Divider';
import { eventBus, EventTypes } from '../../../../services/EventBus';
import { NotificationType } from '../../../../components/GlobalNotifications/GlobalNotifications';
import { useGetAllUsersQuery } from '../../../../api/user';
import {
  useChangeCoursesMutation,
  useGetCurrentSpecialistQuery,
} from '../../../../api/specialists';

interface Course {
  id: number;
  title: string;
  description: string;
  date: string;
}

const Courses = () => {
  const {
    data: user,
    refetch: refetchUserData,
    isLoading: isGetUserLoading,
  } = useGetCurrentSpecialistQuery();

  const {
    data: users,
    refetch: refetchUsersData,
    isLoading: isGetUsersLoading,
  } = useGetAllUsersQuery();

  const [requestChangeCourses, { isLoading, isSuccess, isError }] =
    useChangeCoursesMutation();

  React.useEffect(() => {
    if (isSuccess) {
      refetchUserData();
      refetchUsersData();

      // TODO: добавить уведомление
      eventBus.emit(EventTypes.notification, {
        title: 'Успешно',
        message: 'Данные успешно сохранены',
        type: NotificationType.SUCCESS,
      });
    }

    // isError &&

    // TODO: добавить уведомление
    // showErrorMessage('Что-то пошло не так, попробуйте снова');
  }, [isSuccess, isError]);

  const specialist = !!user && user;

  const initialCourses = specialist ? specialist.courses : [];
  const specialistId = specialist ? specialist.id : NaN;

  const [courses, setCourses] = useState(
    initialCourses
      ? initialCourses.map((course: Course, i: number) => ({
          ...course,
          id: +i + 1,
        }))
      : [],
  );

  const [isDataChanged, setIsDataChanged] = useState(false);
  const [courseIdToDelete, setCourseIdToDelete] = useState(NaN);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const showDeleteModal = () => {
    setIsDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalVisible(false);
  };

  const handleChange = (
    id: number,
    title: string,
    description: string,
    date: string,
  ) => {
    setIsDataChanged(true);

    const filteredCourses = courses.filter(
      (course: Course) => course.id !== id,
    );

    let editedCourse = courses.find((course: Course) => course.id === id);

    editedCourse = {
      id,
      title: title,
      description: description,
      date: date,
    };

    const newCourses = [...filteredCourses, editedCourse].sort(
      (a, b) => a.id - b.id,
    );

    setCourses(newCourses);
  };

  const handleClickAddCourse = () => {
    setCourses([
      ...courses,
      {
        id: Number(courses.length) + 1,
        title: '',
        description: '',
        date: moment().toISOString(),
      },
    ]);
  };

  const handleClickDeleteBtn = (id: number) => {
    if (courses.length === initialCourses.length) {
      setCourseIdToDelete(id);
      showDeleteModal();
    } else {
      const editedCourses = courses.filter(
        (course: Course) => course.id !== id,
      );
      setCourses(editedCourses);
    }
  };

  const handleClickDeleteCourse = (id: number) => {
    const editedCourses = courses.filter((course: Course) => course.id !== id);

    setCourses(editedCourses);

    const coursesWithoutIds = editedCourses.map((course: Course) => ({
      title: course.title,
      description: course.description,
      date: course.date,
    }));

    requestChangeCourses({
      id: specialistId,
      data: coursesWithoutIds,
    });

    closeDeleteModal();
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const coursesWithoutIds = courses.map((course: Course) => ({
      title: course.title,
      description: course.description,
      date: course.date,
    }));

    requestChangeCourses({
      id: specialistId,
      data: coursesWithoutIds,
    });
  };

  const isSubmitDisabled = !!courses.find(
    (course: Course) => course.title === '' || course.description === '',
  );

  return (
    <>
      {(isLoading || isGetUserLoading || isGetUsersLoading) && <Loader />}
      <div className={s.courses}>
        <form onSubmit={handleSubmit}>
          <div className={s.form}>
            {courses.map((course: Course) => (
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
                <Link to={'/profile/' + user?.id}>Отмена</Link>
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
      <Modal isOpened={isDeleteModalVisible} close={() => closeDeleteModal()}>
        <Confirm
          helpMessage="Вы уверены, что хотите удалить курс?"
          accept={() => {
            !!courseIdToDelete && handleClickDeleteCourse(courseIdToDelete);
          }}
          reject={() => closeDeleteModal()}
        />
      </Modal>
    </>
  );
};

export default Courses;
