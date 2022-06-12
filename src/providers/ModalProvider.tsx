import React, { Dispatch, SetStateAction, useState } from 'react';
import { SchemaOf } from 'yup';
import { CreateAnalyzeAnswerDto } from '../@types/dto/analyzes/create.dto';
import { BaseUser } from '../@types/entities/BaseUser';
import { Client } from '../@types/entities/Client';
import { ProgressPhoto } from '../@types/entities/Progress';
import { ModalContext } from '../context/ModalContext';
import { Nav, Page } from '../layouts/PrivateLayout';

interface Props {
  children: React.ReactNode;
}

export enum ModalName {
  MODAL_ADD_PROGRESS_PHOTO = 'MODAL_ADD_PROGRESS_PHOTO',
  MODAL_PROGRESS_PHOTO_SLIDER = 'MODAL_PROGRESS_PHOTO_SLIDER',
  MODAL_ADD_ANALYZE_FILE = 'MODAL_ADD_ANALYZ_FILE',
  MODAL_SIDEBAR_MENU = 'MODAL_SIDEBAR_MENU',
  MODAL_NOTIFICATIONS_MENU = 'MODAL_NOTIFICATIONS_MENU',
}

export type Modal<props> = {
  open: boolean;
  props: props;
};

export type Modals = {
  [ModalName.MODAL_ADD_PROGRESS_PHOTO]: Modal<{
    user: BaseUser;
  }>;
  [ModalName.MODAL_ADD_ANALYZE_FILE]: Modal<{
    onSubmit: (values: CreateAnalyzeAnswerDto) => void;
  }>;
  [ModalName.MODAL_PROGRESS_PHOTO_SLIDER]: Modal<{
    photos: ProgressPhoto[];
    createdAt: Date;
    i?: number;
  }>;
  [ModalName.MODAL_SIDEBAR_MENU]: Modal<{
    nav: Nav[];
    onNavClick: (nav: Partial<Nav>) => void;
    openChat: () => void;
    logout: () => void;
    user: BaseUser | undefined;
    pages: Page[];
    location: Location;
  }>;
  [ModalName.MODAL_NOTIFICATIONS_MENU]: Modal<{
    setSidebarChatOpen: Dispatch<SetStateAction<boolean>>;
    setSidebarNotificationsOpen: Dispatch<SetStateAction<boolean>>;
    onNavClick: (nav: Partial<Nav>) => void;
    user: BaseUser | undefined;
    pages: Page[];
    location: Location;
  }>;
};

export const initialModals = {} as Modals;
export function ModalProvider({ children, ...props }: Props) {
  const [modals, setModals] = useState<Modals>(initialModals);
  return (
    <ModalContext.Provider value={{ modals, setModals }} {...props}>
      {children}
    </ModalContext.Provider>
  );
}
