import React, { useCallback, useEffect, useState } from 'react';
import { useModal } from '../hooks/useModal';
import { AddPhotoModal } from '../pages/Profile/components/Progress/AddPhotoModal/AddPhotoModal';
import { PhotoSliderModal } from '../pages/Profile/components/Progress/PhotoSliderModal/PhotoSliderModal';
import { AddAnalyzeModal } from '../pages/Profile/components/TestsAndAnalyze/AddAnalyzeModal/AddAnalyzeModal';
import { ModalName } from '../providers/ModalProvider';
import { SidebarMenuPopup } from '../shared/Global/Sidebar/SidebarMenuPopup/SidebarMenuPopup';
import { SidebarNotificationsPopup } from '../shared/Global/Sidebar/SidebarNotificationsPopup/SidebarNotificationsPopup';

export const Modals = () => {
  const { modals, closeAllModals } = useModal();

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
        case ModalName.MODAL_ADD_ANALYZ_FILE:
          return <AddAnalyzeModal {...modals[modal].props} />;
        case ModalName.MODAL_SIDEBAR_MENU:
          return <SidebarMenuPopup {...modals[modal].props} />;
        case ModalName.MODAL_NOTIFICATIONS_MENU:
          return <SidebarNotificationsPopup {...modals[modal].props} />;
        default:
          return null;
      }
    });
  }

  const [elements, setElements] = useState<React.ReactNode[]>(getElements());

  useEffect(() => {
    setElements(getElements());
    // eslint-disable-next-line
  }, [modals]);

  const escFunction = useCallback(event => {
    if (event.keyCode === 27) {
      closeAllModals();
    }
  }, [closeAllModals]);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  return <>{elements.map((el, i) => el && <div key={i}>{el}</div>)}</>;
};
