import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { ResponseError } from '../../../@types/api/response';
import { UpdateSpecialistDto } from '../../../@types/dto/specialists/update.dto';
import { UpdateUserDto } from '../../../@types/dto/users/update.dto';
import { useUploadFileMutation } from '../../../api/files';
import {
  useCurrentUserQuery,
  useUpdateEmailMutation,
  useUpdateUserMutation,
} from '../../../api/user';
import { NotificationType } from '../../../components/GlobalNotifications/GlobalNotifications';
import { MAX_IMAGE_SIZE } from '../../../constants/files';
import { eventBus, EventTypes } from '../../../services/EventBus';

import {
  checkFileSize,
  checkFileType,
  FileType,
  uploadFiles,
} from '../../../utils/filesHelper';
import { getMediaLink } from '../../../utils/mediaHelper';
import { EditProfileData } from '../components/EditProfileData/EditProfileData';

const EditProfile = () => {
  const options = [
    { value: 'Мужской', label: 'Мужской' },
    { value: 'Женский', label: 'Женский' },
  ];

  const history = useHistory();

  const { data: user } = useCurrentUserQuery();
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

  async function onSubmit(values: UpdateUserDto & UpdateSpecialistDto) {
    try {
      if (values.email && user?.email !== values.email) {
        const res = await updateEmail({ email: values.email }).unwrap();
        eventBus.emit(EventTypes.notification, {
          title: 'Внимание!',
          message: res?.message,
          type: NotificationType.INFO,
          dismiss: {
            duration: 10000,
          },
        });
      }

      let profilePhoto = values.profilePhoto;
      if (values.profilePhoto instanceof File) {
        const res = await uploadFile({ file: values.profilePhoto }).unwrap();
        profilePhoto = res.name;
      }
      const data: UpdateUserDto = {
        ...values,
        profilePhoto,
        email: user?.email,
      };
      await updateClient(data);
      eventBus.emit(EventTypes.notification, {
        title: 'Успешно!',
        message: 'Данные профиля обновлены!',
        type: NotificationType.SUCCESS,
      });
      history.push('/profile');
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        title: 'Произошла ошибка!',
        message: (error as ResponseError)?.data?.message,
        type: NotificationType.DANGER,
        dismiss: {
          duration: 10000,
        },
      });
    }
  }
  async function onAvatarLoaded(
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: File) => void,
  ) {
    try {
      eventBus.emit(EventTypes.removeNotification, 'avatar_type_error');
      const files = e.target.files || null;
      const paths = [FileType.PNG, FileType.JPEG, FileType.GIF];

      if (!files) return;
      if (checkFileSize(files[0], MAX_IMAGE_SIZE)) throw new Error();
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
        id: 'file_type_error',
        dismiss: {
          duration: 7000,
          onScreen: true,
        },
      });
    }
  }

  return (
    <EditProfileData
      options={options}
      image={image}
      onSubmit={onSubmit}
      loader={isLoading}
      onAvatarLoaded={onAvatarLoaded}
      user={user}
    />
  );
};

export default EditProfile;
