import React, { Dispatch, SetStateAction, useState } from 'react';
import { ModalContext } from '../context/ModalContext';
import { Nav, Pages } from '../layouts/SidebarLayout';

import { CreateAnalyzeAnswerData } from '../store/ducks/analyze/contracts/state';
import { Photo } from '../store/ducks/progress/contracts/state';

interface Props {
  children: React.ReactNode;
}

export enum ModalName {
  MODAL_ADD_PROGRESS_PHOTO = 'MODAL_ADD_PROGRESS_PHOTO',
  MODAL_PROGRESS_PHOTO_SLIDER = 'MODAL_PROGRESS_PHOTO_SLIDER',
  MODAL_ADD_ANALYZ_FILE = 'MODAL_ADD_ANALYZ_FILE',
  MODAL_SIDEBAR_MENU = 'MODAL_SIDEBAR_MENU',
  MODAL_NOTIFICATIONS_MENU = 'MODAL_NOTIFICATIONS_MENU',
}

export type Modal<props> = {
  open: boolean;
  props: props;
};

export type Modals = {
  [ModalName.MODAL_ADD_PROGRESS_PHOTO]: Modal<{}>;
  [ModalName.MODAL_ADD_ANALYZ_FILE]: Modal<{
    onSubmit: (values: CreateAnalyzeAnswerData) => void;
    validationSchema: any;
    onErrorFileLoaded: () => void;
    onSuccessFileLoaded: () => void;
  }>;
  [ModalName.MODAL_PROGRESS_PHOTO_SLIDER]: Modal<{
    photos: Photo[];
    createdAt: Date;
    i?: number;
  }>;
  [ModalName.MODAL_SIDEBAR_MENU]: Modal<{
    nav: Nav[];
    setPage: Dispatch<SetStateAction<string>>;
    openChat: () => void;
    logout: () => void;
    user: User | undefined;
    pages: Pages[];
    location: any;
  }>;
  [ModalName.MODAL_NOTIFICATIONS_MENU]: Modal<{
    setSidebarChatOpen: Dispatch<SetStateAction<boolean>>;
    setSidebarNotificationsOpen: Dispatch<SetStateAction<boolean>>;
    setPage: Dispatch<SetStateAction<string>>;
    user: User | undefined;
    pages: Pages[];
    location: any;
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
