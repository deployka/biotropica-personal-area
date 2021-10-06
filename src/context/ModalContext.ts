import { createContext, Dispatch, SetStateAction } from 'react';
import { modals, ModalsType } from '../providers/ModalProvider';

interface Props {
  setOpenModals: Dispatch<SetStateAction<ModalsType>>;
  openModals: ModalsType;
}

export const ModalContext = createContext<Props>({
  setOpenModals: () => null,
  openModals: modals,
});
