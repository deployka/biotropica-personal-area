import { createContext, Dispatch, SetStateAction } from 'react';
import { initialModals, Modals } from '../providers/ModalProvider';

interface Props {
  setModals: Dispatch<SetStateAction<Modals>>;
  modals: Modals;
}

export const ModalContext = createContext<Props>({
  setModals: () => null,
  modals: initialModals,
});
