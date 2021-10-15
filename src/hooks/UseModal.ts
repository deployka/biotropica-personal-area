import { Dispatch, SetStateAction, useContext } from 'react';
import { ModalContext } from '../context/ModalContext';
import { ModalName, Modals } from '../providers/ModalProvider';

interface Props {
  modals: Modals;
  setModals: Dispatch<SetStateAction<Modals>>;
}

export const useModal = () => {
  const { modals, setModals } = useContext<Props>(ModalContext);
  return {
    modals,
    openModal<N extends ModalName, P extends Modals[N]['props']>(
      name: N,
      props?: P
    ) {
      setModals({ ...modals, [name]: { open: true, props } });
    },
    closeModal(name: ModalName) {
      setModals({
        ...modals,
        [name]: { open: false, props: null },
      });
    },
    closeAllModals() {
      Object.keys(modals).forEach((modal: string) =>
        this.closeModal(modal as ModalName)
      );
    },
  };
};
