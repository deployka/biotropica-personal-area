import React, { useState } from 'react';
import { ModalContext } from '../context/ModalContext';
import { Photo } from '../pages/Profile/components/Progress/PhotoSliderModal/PhotoSliderModal';

interface Props {
  children: React.ReactNode;
}

export enum ModalName {
  MODAL_ADD_PROGRESS_PHOTO = 'MODAL_ADD_PROGRESS_PHOTO',
  MODAL_PROGRESS_PHOTO_SLIDER = 'MODAL_PROGRESS_PHOTO_SLIDER',
}

type ModalTypeProps = {
  [ModalName.MODAL_ADD_PROGRESS_PHOTO]: undefined;
  [ModalName.MODAL_PROGRESS_PHOTO_SLIDER]: {
    photos: Photo[];
  };
};

export type ModalType<V extends ModalName> = {
  open: boolean;
  props: ModalTypeProps[V];
};

export type ModalsType = {
  [key in ModalName]: ModalType<ModalName>;
};

export const modals: ModalsType = Object.keys(ModalName).reduce(
  (acc: any, key: string) => {
    acc[key] = {
      open: false,
      props: null,
    };
    return acc;
  },
  {}
);

export function ModalProvider({ children, ...props }: Props) {
  const [openModals, setOpenModals] = useState<ModalsType>(modals);
  return (
    <ModalContext.Provider value={{ openModals, setOpenModals }} {...props}>
      {children}
    </ModalContext.Provider>
  );
}
