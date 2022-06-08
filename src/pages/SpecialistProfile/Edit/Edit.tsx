import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import s from './Edit.module.scss';
// import EditProfile from '../components/EditProfile/EditProfile';
import Courses from '../components/Courses/Courses';
import TabButtons, { Tab } from '../../../components/TabButtons/TabButtons';
import EditProfile from '../../Profile/containers/EditProfile';
import { Security } from '../../Profile/containers/Security';
import {
  useCurrentUserQuery,
  useUpdateEmailMutation,
  useUpdateUserMutation,
} from '../../../api/user';
import { useUploadFileMutation } from '../../../api/files';
import { UpdateSpecialistDto } from '../../../@types/dto/specialists/update.dto';
import { useGetCurrentSpecialistQuery } from '../../../api/specialists';
import { EditProfileData } from '../components/EditProfileData/EditProfileData';

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
  const [activeTab, setActiveTab] = useState<string>(tabs[0].key);

  const { data: currentSpecialist } = useGetCurrentSpecialistQuery();

  const [updateClient, { isLoading: isUpdateLoading }] =
    useUpdateUserMutation();
  const [updateEmail, { isLoading: isUpdateEmailLoading }] =
    useUpdateEmailMutation();
  const [uploadFile, { isLoading: isUploadFileLoading }] =
    useUploadFileMutation();
  const isLoading =
    isUpdateLoading || isUpdateEmailLoading || isUploadFileLoading;

  const handleSubmit = async (values: UpdateSpecialistDto) => {
    console.log(values);

    // try {
    //   if (values.email && user?.email !== values.email) {
    //     const res = await updateEmail({ email: values.email }).unwrap();
    //     eventBus.emit(EventTypes.notification, {
    //       title: 'Внимание!',
    //       message: res?.message,
    //       type: NotificationType.INFO,
    //       dismiss: {
    //         duration: 10000,
    //       },
    //     });
    //   }

    //   let profilePhoto = values.profilePhoto;
    //   if (values.profilePhoto instanceof File) {
    //     const res = await uploadFile({ file: values.profilePhoto }).unwrap();
    //     profilePhoto = res.name;
    //   }
    //   const data: UpdateUserDto = {
    //     ...values,
    //     profilePhoto,
    //     email: user?.email,
    //   };
    //   await updateClient(data);
    //   eventBus.emit(EventTypes.notification, {
    //     title: 'Успешно!',
    //     message: 'Данные профиля обновлены!',
    //     type: NotificationType.SUCCESS,
    //   });
    //   history.push('/profile');
    // } catch (error) {
    //   eventBus.emit(EventTypes.notification, {
    //     title: 'Произошла ошибка!',
    //     message: (error as { message: string })?.message,
    //     type: NotificationType.INFO,
    //     dismiss: {
    //       duration: 10000,
    //     },
    //   });
    // }
  };

  const onAvatarLoaded = async (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: File) => void,
  ) => {
    console.log(e.target.files);
    // try {
    //   eventBus.emit(EventTypes.removeNotification, 'avatar_type_error');
    //   const files = e.target.files || null;
    //   const paths = [FileType.PNG, FileType.JPEG, FileType.GIF];
    //   if (!files) return;
    //   if (checkFileSize(files[0], MAX_IMAGE_SIZE)) throw new Error();
    //   if (!checkFileType(files[0], paths)) throw new Error();
    //   const fr = await uploadFiles(files);
    //   setImage(fr.result);
    //   setFieldValue('profilePhoto', files[0]);
    // } catch (error) {
    //   eventBus.emit(EventTypes.notification, {
    //     title: 'Фото не добавлено!',
    //     message: `Допустимые типы: png, jpg, gif
    //             Максимальный размер: ${MAX_IMAGE_SIZE} мб`,
    //     type: NotificationType.DANGER,
    //     id: 'file_type_error',
    //     dismiss: {
    //       duration: 7000,
    //       onScreen: true,
    //     },
    //   });
    // }
  };

  if (!currentSpecialist) {
    return <p>Ошибка</p>;
  }

  return (
    <div className={s.edit}>
      <TabButtons
        tabs={tabs}
        activeTab={activeTab}
        onActiveTabChanged={setActiveTab}
      />
      {activeTab === tabs[0].key && (
        <EditProfileData
          onSubmit={handleSubmit}
          user={currentSpecialist.user}
          profilePhoto={currentSpecialist.user.profilePhoto || ''}
          isLoading={false}
          options={options}
          onAvatarLoaded={onAvatarLoaded}
        />
      )}
      {activeTab === tabs[1].key && <Security />}
      {activeTab === tabs[2].key && <Courses />}
    </div>
  );
};

export default EditSpecialistProfile;
