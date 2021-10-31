import React, { useCallback, useEffect, useState } from 'react';
import { useModal } from '../hooks/UseModal';
import { AddPhotoModal } from '../pages/Profile/components/Progress/AddPhotoModal/AddPhotoModal';
import { PhotoSliderModal } from '../pages/Profile/components/Progress/PhotoSliderModal/PhotoSliderModal';
import { ModalName } from '../providers/ModalProvider';

interface Props {}

export const Modals = ({}: Props) => {
  const { modals, closeAllModals } = useModal();

  useEffect(() => {
    setElements(getElements());
  }, [modals]);

  const escFunction = useCallback(event => {
    if (event.keyCode === 27) {
      closeAllModals();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, []);

  const [elements, setElements] = useState<React.ReactNode[]>(getElements());

  function getElements(): React.ReactNode[] {
    return Object.keys(modals).map((modal: string) => {
      if (!modals[modal as ModalName].open) {
        return null;
      }
      switch (modal) {
        case ModalName.MODAL_ADD_PROGRESS_PHOTO:
          return <AddPhotoModal {...modals[modal].props} />;

        case ModalName.MODAL_PROGRESS_PHOTO_SLIDER:
          return <PhotoSliderModal {...modals[modal].props} />;
        default:
          return null;
      }
    });
  }

  return <>{elements.map((el, i) => el && <div key={i}>{el}</div>)}</>;
};
