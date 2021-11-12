import React, { useEffect, useState } from 'react';
import { store } from 'react-notifications-component';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { notification } from '../../../config/notification/notificationForm';
import FileService from '../../../services/FileService';
import UserService from '../../../services/UserService';
import {
  fetchUpdateUser,
  setUserResponse,
} from '../../../store/ducks/user/actionCreators';
import {
  UpdateUserData,
  User,
} from '../../../store/ducks/user/contracts/state';
import {
  selectUserData,
  selectUserLoadingStatus,
  selectUserResponse,
} from '../../../store/ducks/user/selectors';
import { LoadingStatus } from '../../../store/types';
import { getMediaLink } from '../../../utils/mediaHelper';
import { EditProfileData } from '../components/EditProfileData/EditProfileData';

const EditProfile = () => {
  const options = [
    { value: 'Мужской', label: 'Мужской' },
    { value: 'Женский', label: 'Женский' },
  ];

  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectUserLoadingStatus);
  const response = useSelector(selectUserResponse);
  const history = useHistory();

  const user: User | undefined = useSelector(selectUserData);
  const userImage = user?.profile_photo && getMediaLink(user?.profile_photo);

  const loader = LoadingStatus.LOADING === loadingStatus;
  const [image, setImage] = useState<string | ArrayBuffer | null>(
    userImage || ''
  );

  useEffect(() => {
    if (!response) return;
    switch (loadingStatus) {
      case LoadingStatus.ERROR:
        store.addNotification({
          ...notification,
          title: 'Произошла ошибка!',
          message: response?.message || 'Произошла непредвиденная ошибка!',
          type: 'danger',
        });
        break;
      case LoadingStatus.SUCCESS:
        store.addNotification({
          ...notification,
          title: 'Успешно!',
          message: response?.message || 'Успешно!',
          type: 'success',
        });
        dispatch(setUserResponse(undefined));
        history.push('/profile');
        break;
      default:
        break;
    }
  }, [loadingStatus, response]);

  async function onSubmit(values: UpdateUserData) {
    try {
      if (values.email && user?.email !== values.email) {
        const res = await UserService.updateEmail({ email: values.email });
        store.addNotification({
          ...notification,
          title: 'Внимание!',
          message: res?.data.message || '',
          type: 'info',
          dismiss: {
            pauseOnHover: true,
            onScreen: true,
            duration: 10000,
          },
        });
      }
      if (values.profile_photo instanceof File) {
        const res = await FileService.upload(values.profile_photo);
        values.profile_photo = res.data.name;
      }
      const data: UpdateUserData = {
        ...values,
        email: user?.email,
      };
      dispatch(fetchUpdateUser(data));
    } catch (error) {
      store.addNotification({
        ...notification,
        title: 'Ошибка!',
        message: 'Произошла непредвиденная ошибка!',
        type: 'danger',
        dismiss: {
          onScreen: true,
        },
      });
    }
  }

  function loadAvatar(
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) {
    const tgt = e.target;
    const files = tgt.files;
    const permittedPaths = ['image/png', 'image/jpeg', 'image/gif'];

    if (
      FileReader &&
      files &&
      files.length &&
      permittedPaths.includes(files?.[0]?.type)
    ) {
      store.removeNotification('avatar_type_error');
      const fr = new FileReader();
      fr.onload = function () {
        setImage(fr.result);
        setFieldValue('profile_photo', files[0]);
      };
      fr.readAsDataURL(files[0]);
    } else {
      store.addNotification({
        ...notification,
        title: 'Фото профиля не обновлено!',
        message: 'Допустимые типы изображения: png, jpg, gif',
        type: 'danger',
        id: 'avatar_type_error',
        dismiss: {
          duration: 7000,
          onScreen: true,
        },
      });
    }
  }
  return (
    <>
      {user && (
        <EditProfileData
          options={options}
          image={image}
          onSubmit={onSubmit}
          loader={loader}
          loadAvatar={loadAvatar}
          user={user}
        />
      )}
    </>
  );
};

export default EditProfile;
