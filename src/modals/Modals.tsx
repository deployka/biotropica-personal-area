import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useModal } from '../hooks/UseModal';
import { AddPhotoModal } from '../pages/Profile/components/Progress/AddPhotoModal/AddPhotoModal';
import { PhotoSliderModal } from '../pages/Profile/components/Progress/PhotoSliderModal/PhotoSliderModal';
import { ModalName } from '../providers/ModalProvider';

interface Props {}

export const Modals = ({}: Props) => {
  const { openModals, closeAllModals } = useModal();
  const location = useLocation();

  useEffect(() => {
    closeAllModals();
  }, [location.pathname]);

  useEffect(() => {
    setElements(getElements());
  }, [openModals]);

  const [elements, setElements] = useState<React.ReactNode[]>(getElements());

  function getElements(): React.ReactNode[] {
    return Object.keys(openModals).map((modal: string) => {
      if (
        modal === ModalName.MODAL_ADD_PROGRESS_PHOTO &&
        openModals[modal].open
      ) {
        return <AddPhotoModal {...openModals[modal].props} />;
      }
      if (
        modal === ModalName.MODAL_PROGRESS_PHOTO_SLIDER &&
        openModals[modal].open
      ) {
        return <PhotoSliderModal {...openModals[modal].props} />;
      }
      return null;
    });
  }

  return <>{elements.map((el, i) => el && <div key={i}>{el}</div>)}</>;
};
