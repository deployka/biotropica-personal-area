import { Dispatch, SetStateAction, useContext } from 'react';
import { ModalContext } from '../context/ModalContext';
import { ModalsType } from '../providers/ModalProvider';

interface Props {
  openModals: ModalsType;
  setOpenModals: Dispatch<SetStateAction<ModalsType>>;
}

export const useModal = () => {
  const { openModals, setOpenModals } = useContext<Props>(ModalContext);
  return {
    openModals,
    setOpenModals: (props?: any) => {
      setOpenModals({ ...openModals, ...props });
    },
    closeAllModals: () => {
      Object.keys(openModals).forEach(modal => {
        setOpenModals(prev => ({ ...prev, [modal]: { open: false } }));
      });
    },
  };
};
