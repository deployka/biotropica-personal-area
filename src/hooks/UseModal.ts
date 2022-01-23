import { Dispatch, SetStateAction, useContext } from 'react';
import { ModalContext } from '../context/ModalContext';
import { ModalName, Modals } from '../providers/ModalProvider';

interface Props {
  modals: Modals;
  setModals: Dispatch<SetStateAction<Modals>>;
}

export const useModal = () => {
  const { modals, setModals } = useContext<Props>(ModalContext);
  function closeModal(name: ModalName) {
    setModals({
      ...modals,
      [name]: { open: false, props: null },
    });
  }
  return {
    modals,
    openModal<N extends ModalName, P extends Modals[N]['props']>(
      name: N,
      props?: P,
    ) {
      setModals({ ...modals, [name]: { open: true, props } });
    },
    closeModal,
    closeAllModals() {
      Object.keys(modals).forEach((modal: string) => closeModal(modal as ModalName));
    },
  };
};
