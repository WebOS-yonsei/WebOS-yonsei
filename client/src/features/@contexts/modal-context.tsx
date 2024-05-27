import { Portal } from '@chakra-ui/react';
import { PropsWithChildren, ReactElement, createContext, useCallback, useContext, useMemo, useState } from 'react';

const ModalStateContext = createContext<ReactElement[]>([]);

const ModalActionContext = createContext<{
  open: (modal: ReactElement) => void;
  close: () => void;
}>({
  open: () => {},
  close: () => {},
});

const useModalState = () => useContext(ModalStateContext);

export const useModal = () => useContext(ModalActionContext);

export function ModalProvider({ children }: PropsWithChildren) {
  const [modals, setModals] = useState<ReactElement[]>([]);

  const open = useCallback((modal: ReactElement) => {
    setModals((prev) => [...prev, modal]);
  }, []);

  const close = useCallback(() => {
    setModals((prev) => prev.slice(0, prev.length - 1));
  }, []);

  const action = useMemo(() => ({ open, close }), [open, close]);

  return (
    <ModalStateContext.Provider value={modals}>
      <ModalActionContext.Provider value={action}>{children}</ModalActionContext.Provider>
    </ModalStateContext.Provider>
  );
}

export function ModalConsumer() {
  const modals = useModalState();

  return (
    <Portal>
      {modals.map((modal, index) => (
        <div key={index}>{modal}</div>
      ))}
    </Portal>
  );
}
