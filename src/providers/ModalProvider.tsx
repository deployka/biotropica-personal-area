import React, { useState } from 'react';
import { ModalContext } from '../context/ModalContext';
import { Photo } from '../store/ducks/progress/contracts/state';

interface Props {
  children: React.ReactNode;
}

export enum ModalName {
  MODAL_ADD_PROGRESS_PHOTO = 'MODAL_ADD_PROGRESS_PHOTO',
  MODAL_PROGRESS_PHOTO_SLIDER = 'MODAL_PROGRESS_PHOTO_SLIDER',
}

export type Modal<props> = {
  open: boolean;
  props: props;
};

export type Modals = {
  [ModalName.MODAL_ADD_PROGRESS_PHOTO]: Modal<{}>;
  [ModalName.MODAL_PROGRESS_PHOTO_SLIDER]: Modal<{
    photos: Photo[];
    createdAt: Date;
    i?: number;
  }>;
};

export const initialModals: Modals = Object.keys(ModalName).reduce(
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
  const [modals, setModals] = useState<Modals>(initialModals);
  return (
    <ModalContext.Provider value={{ modals, setModals }} {...props}>
      {children}
    </ModalContext.Provider>
  );
}
