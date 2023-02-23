import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Tab, Tabs } from '../../../shared/Global/Tabs/Tabs';
import { getTabByKey } from '../../../utils/tabsHelper';
import {
  useCurrentUserQuery,
  useUpdateEmailMutation,
  useUpdateUserMutation,
} from '../../../api/user';

import { EditProfilePassword } from '../../../components/EditProfile/Password/Password';
import { FormikHelpers } from 'formik';
import {
  useChangePasswordMutation,
  useSignOutMutation,
} from '../../../api/auth';
import { ChangePasswordDto } from '../../../@types/dto/auth/change-password.dto';
import { eventBus, EventTypes } from '../../../services/EventBus';
import { NotificationType } from '../../../components/GlobalNotifications/GlobalNotifications';
import { ResponseError } from '../../../@types/api/response';
import { NotificationButtons } from './NotificationButtons';
import { EditProfileClientData } from '../../../components/EditProfile/ClientData/ClientData';
import { useUploadFileMutation } from '../../../api/files';
import { getMediaLink } from '../../../utils/mediaHelper';
import { UpdateUserDto } from '../../../@types/dto/users/update.dto';
import {
  checkFileSize,
  checkFileType,
  FileType,
  uploadFiles,
} from '../../../utils/filesHelper';
import { MAX_IMAGE_SIZE, MAX_PDF_SIZE } from '../../../constants/files';
import { UpdateSpecialistDto } from '../../../@types/dto/specialists/update.dto';

export interface Param {
  active: string;
}

const tabs: Tab[] = [
  {
    key: 'edit-profile',
    value: 'Личные данные',
  },
  {
    key: 'security',
    value: 'Безопасность',
  },
];

const options = [
  { value: 'Мужской', label: 'Мужской' },
  { value: 'Женский', label: 'Женский' },
];

const Edit = () => {
  const { data: user } = useCurrentUserQuery();

  const history = useHistory();

  const { active } = useParams<Param>();
  const [activeTab, setActiveTab] = useState<string>(
    getTabByKey(active as string, tabs)?.key || tabs[0].key,
  );

  const userImage = user?.profilePhoto && getMediaLink(user?.profilePhoto);

  const [image, setImage] = useState<string | ArrayBuffer | null>(
    userImage || '',
  );

  const [updateClient, { isLoading: isUpdateLoading }] =
    useUpdateUserMutation();
  const [updateEmail, { isLoading: isUpdateEmailLoading }] =
    useUpdateEmailMutation();
  const [uploadFile, { isLoading: isUploadFileLoading }] =
    useUploadFileMutation();
  const isLoading =
    isUpdateLoading || isUpdateEmailLoading || isUploadFileLoading;

  const saveChangedEmail = async (email?: string) => {
    if (!email || user?.email === email) return;

    const res = await updateEmail({ email }).unwrap();
    eventBus.emit(EventTypes.notification, {
      message: res?.message,
      type: NotificationType.INFO,
      autoClose: 10000,
    });
  };

  const uploadPhoto = async (file: File) => {
    const res = await uploadFile({ file }).unwrap();
    return res.name;
  };

  const onUpdateUserData = async (
    values: UpdateUserDto & UpdateSpecialistDto,
  ) => {
    try {
      await saveChangedEmail(values.email);

      let profilePhotoLink = user?.profilePhoto;
      if (values.profilePhoto instanceof File) {
        profilePhotoLink = await uploadPhoto(values.profilePhoto);
      }
      const data: UpdateUserDto = {
        ...values,
        profilePhoto: profilePhotoLink,
        email: user?.email,
      };
      await updateClient(data);
      // locked popup

      // eventBus.emit(EventTypes.notification, {
      //   message: 'Данные профиля обновлены!',
      //   type: NotificationType.SUCCESS,
      // });
      if (user?.roles[0].name === 'CLIENT') {
        history.push('/profile');
      }
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        message: (error as ResponseError)?.data?.message,
        type: NotificationType.DANGER,
        autoClose: 10000,
      });
    }
  };
  const handleLoadAvatar = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: File) => void,
  ) => {
    try {
      eventBus.emit(EventTypes.removeNotification, 'avatar_type_error');
      const files = e.target.files || null;
      const paths = [FileType.PNG, FileType.JPEG, FileType.GIF];

      if (!files) return;
      if (checkFileSize(files[0], MAX_PDF_SIZE)) throw new Error();
      if (!checkFileType(files[0], paths)) throw new Error();

      const fr = await uploadFiles(files);
      setImage(fr.result);
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

  useEffect(() => {
    history.push(`/profile/edit/${activeTab}`);
  }, [activeTab]);

  const [changePassword, { isLoading: isChangePasswordLoading }] =
    useChangePasswordMutation();
  const [signout] = useSignOutMutation();

  const submitChangePassword = async (
    values: ChangePasswordDto,
    options: FormikHelpers<ChangePasswordDto>,
  ) => {
    try {
      await changePassword(values).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Пароль успешно изменен!',
        type: NotificationType.SUCCESS,
      });
      options.resetForm();
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        message: (error as ResponseError)?.data.message,
        type: NotificationType.DANGER,
      });
      options.setFieldValue('currentPassword', '');
    }
  };

  const onDiscardRestorePassword = () => {
    eventBus.emit(EventTypes.removeNotification, 'logout-notification');
  };

  const onConfirmRestorePassword = () => {
    signout();
    history.push(`/forgot-password?email=${user?.email || ''}`);
  };

  const handleClickRestorePassword = () => {
    eventBus.emit(EventTypes.notification, {
      title: 'Для восстановления пароля будет выполнен выход из аккаунта',
      message: (
        <NotificationButtons
          onDiscard={onDiscardRestorePassword}
          onConfirm={onConfirmRestorePassword}
        />
      ),
      type: NotificationType.WARNING,
      autoClose: false,
      theme: 'dark',
      toastId: 'logout-notification',
    });
  };

  return (
    <div>
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onActiveTabChanged={setActiveTab}
      />
      {active === tabs[0].key && user && (
        <EditProfileClientData
          user={user}
          loader={isLoading}
          image={image}
          options={options}
          onAvatarLoaded={handleLoadAvatar}
          onSubmit={onUpdateUserData}
        />
      )}
      {active === tabs[1].key && user && (
        <EditProfilePassword
          isLoading={isChangePasswordLoading}
          onRestorePassword={handleClickRestorePassword}
          onSubmit={submitChangePassword}
        />
      )}
    </div>
  );
};

export default Edit;
