import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';

import s from './Edit.module.scss';
// import EditProfile from '../components/EditProfile/EditProfile';

import TabButtons, { Tab } from '../../../components/TabButtons/TabButtons';
import {
  useUpdateEmailMutation,
  useUpdateUserMutation,
} from '../../../api/user';
import { useUploadFileMutation } from '../../../api/files';
import { UpdateSpecialistDto } from '../../../@types/dto/specialists/update.dto';
import {
  useChangeCoursesMutation,
  useChangeSpecialistDataMutation,
  useGetCurrentSpecialistQuery,
} from '../../../api/specialists';
import { EditProfileData } from '../components/EditProfileData/EditProfileData';
import { eventBus, EventTypes } from '../../../services/EventBus';
import {
  checkFileSize,
  checkFileType,
  FileType,
  uploadFiles,
} from '../../../utils/filesHelper';
import { MAX_IMAGE_SIZE } from '../../../constants/files';
import { NotificationType } from '../../../components/GlobalNotifications/GlobalNotifications';
import { getMediaLink } from '../../../utils/mediaHelper';
import { UpdateUserDto } from '../../../@types/dto/users/update.dto';
import {
  useChangePasswordMutation,
  useSignOutMutation,
} from '../../../api/auth';
import { ChangePasswordDto } from '../../../@types/dto/auth/change-password.dto';
import Safety from '../components/Safety/Safety';
import { Courses } from '../components/Courses/Courses';
import { ChangeCourseDto } from '../../../@types/dto/specialists/change-courses.dto';
import { ResponseError } from '../../../@types/api/response';
import { getTabByKey } from '../../../utils/tabsHelper';
import { Tabs } from '../../../shared/Global/Tabs/Tabs';

export interface Param {
  active: string;
}

const options = [
  { value: 'Мужской', label: 'Мужской' },
  { value: 'Женский', label: 'Женский' },
];

const tabs: Tab[] = [
  {
    key: 'profile',
    value: 'Личные данные',
  },
  {
    key: 'safety',
    value: 'Безопасность',
  },
  {
    key: 'courses',
    value: 'Ваши курсы',
  },
];

const EditSpecialistProfile = () => {
  const { active } = useParams<Param>();
  const [activeTab, setActiveTab] = useState<string>(
    getTabByKey(active, tabs)?.key || tabs[0].key,
  );
  const history = useHistory();

  const {
    data: currentSpecialist,
    isLoading: isSpecialistLoading,
    isError: isSpecialistError,
  } = useGetCurrentSpecialistQuery();

  const userImage =
    currentSpecialist?.user?.profilePhoto &&
    getMediaLink(currentSpecialist.user.profilePhoto);

  const [image, setImage] = useState<string | ArrayBuffer | null>(
    userImage || '',
  );

  useEffect(() => {
    setImage(userImage || '');
  }, [userImage]);

  const [updatePassword] = useChangePasswordMutation();
  const [changeCourses] = useChangeCoursesMutation();
  const [updateClient, { isLoading: isUpdateLoading }] =
    useUpdateUserMutation();
  const [updateEmail, { isLoading: isUpdateEmailLoading }] =
    useUpdateEmailMutation();
  const [updateSpecialistData] = useChangeSpecialistDataMutation();
  const [fetchUploadFile, { isLoading: isUploadFileLoading }] =
    useUploadFileMutation();
  const isLoading =
    isUpdateLoading || isUpdateEmailLoading || isUploadFileLoading;

  const handleChangeCourses = async (data: ChangeCourseDto) => {
    try {
      await changeCourses(data).unwrap();
      eventBus.emit(EventTypes.notification, {
        title: 'Успешно!',
        message: 'Курсы обновлены',
        type: NotificationType.SUCCESS,
      });
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        message: 'Произошла ошибка',
        type: NotificationType.DANGER,
      });
    }
  };

  const handleUpdatePassword = async (data: ChangePasswordDto) => {
    try {
      await updatePassword(data).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Пароль успешно обновлен!',
        type: NotificationType.SUCCESS,
      });
    } catch (error) {
      console.log(error);
      eventBus.emit(EventTypes.notification, {
        message: (error as ResponseError)?.data.message,
        type: NotificationType.DANGER,
      });
    }
  };

  const handleSubmitProfileData = async (
    values: UpdateUserDto & UpdateSpecialistDto,
  ) => {
    try {
      if (values.email && currentSpecialist?.user.email !== values.email) {
        const res = await updateEmail({ email: values.email }).unwrap();
        eventBus.emit(EventTypes.notification, {
          title: 'Внимание!',
          message: res?.message,
          type: NotificationType.INFO,
          autoClose: 10000,
        });
      }

      await updateSpecialistData({
        education: values.education,
        specializations: values.specializations,
        experience: values.experience,
        price: values.price,
      }).unwrap();

      let profilePhoto = values.profilePhoto;
      if (values.profilePhoto instanceof File) {
        const res = await fetchUploadFile({
          file: values.profilePhoto,
        }).unwrap();
        profilePhoto = res.name;
      }
      const data: UpdateUserDto = {
        id: currentSpecialist?.user.id || 0,
        dob: values.dob,
        gender: values.gender,
        name: values.name,
        lastname: values.lastname,
        patronymic: values.patronymic,
        phone: values.phone,
        profilePhoto,
        email: currentSpecialist?.user.email,
      };
      await updateClient(data).unwrap();
      eventBus.emit(EventTypes.notification, {
        title: 'Успешно!',
        message: 'Данные профиля обновлены!',
        type: NotificationType.SUCCESS,
      });
      history.push('/profile');
    } catch (error) {
      console.error(error);

      eventBus.emit(EventTypes.notification, {
        title: 'Произошла ошибка!',
        message: (error as ResponseError).data.message,
        type: NotificationType.DANGER,
        autoClose: 5000,
      });
    }
  };

  const onAvatarLoaded = async (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: File) => void,
  ) => {
    console.log(e.target.files);
    try {
      // eventBus.emit(EventTypes.removeNotification, 'avatar_type_error');
      const files = e.target.files || null;
      const paths = [FileType.PNG, FileType.JPEG, FileType.GIF];
      if (!files) return;
      if (checkFileSize(files[0], MAX_IMAGE_SIZE)) throw new Error();
      if (!checkFileType(files[0], paths)) throw new Error();
      const fr = await uploadFiles(files);
      const file = fr.result;
      setImage(file);
      setFieldValue('profilePhoto', files[0]);
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        title: 'Фото не добавлено!',
        message: `Допустимые типы: png, jpg, gif
                Максимальный размер: ${MAX_IMAGE_SIZE} мб`,
        type: NotificationType.DANGER,
        toastId: 'file_type_error',
        autoClose: 7000,
      });
    }
  };

  if (isSpecialistLoading) {
    return <p>Загрузка...</p>;
  }

  if (!isSpecialistLoading && isSpecialistError) {
    return <p>Произошла ошибка</p>;
  }

  if (!currentSpecialist) {
    return <p>Произошла ошибка</p>;
  }

  const specialistData = {
    specializations: currentSpecialist.specializations,
    experience: currentSpecialist.experience,
    education: currentSpecialist.education,
  };

  return (
    <div className={s.edit}>
      <div className={s.tabs__container}>
        <div className={s.horizontalScroll}>
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onActiveTabChanged={setActiveTab}
          />
        </div>
      </div>
      {activeTab === tabs[0].key && (
        <EditProfileData
          onSubmit={handleSubmitProfileData}
          userData={currentSpecialist.user}
          specialistData={specialistData}
          profilePhoto={image || ''}
          isLoading={isLoading}
          options={options}
          onAvatarLoaded={onAvatarLoaded}
        />
      )}
      {activeTab === tabs[1].key && (
        <Safety user={currentSpecialist.user} onSubmit={handleUpdatePassword} />
      )}
      {activeTab === tabs[2].key && (
        <Courses
          courses={currentSpecialist.courses}
          specialistId={currentSpecialist.user.id}
          onChange={handleChangeCourses}
        />
      )}
    </div>
  );
};

export default EditSpecialistProfile;
