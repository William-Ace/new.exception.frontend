import React, { createContext, useContext, useState } from 'react';

type ModalProviderPropsType = {
  children: React.ReactNode;
};

type ModalStateType = {
  isOpen: boolean;
  showModal: (payload: any) => void;
  hideModal: () => void;
  modalData: any;
};

export const ModalContext = createContext<ModalStateType | undefined>(undefined);

const ModalProvider = ({ children }: ModalProviderPropsType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const showModal = (payload: any) => {
    setModalData(() => payload);
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        showModal,
        hideModal,
        modalData
      }}>
      {children}
    </ModalContext.Provider>
  );
};

function useModal() {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
}

export { ModalProvider, useModal };
