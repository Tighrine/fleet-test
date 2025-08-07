import { Store, useStore } from '@tanstack/react-store';
import type { ConfirmationDialogState } from './type';

const store = new Store<{ confirmation: ConfirmationDialogState | null }>({
  confirmation: {
    open: false,
    title: '',
    message: '',
    confirm: () => {},
  },
});
export const showConfirmDialog = (params: ConfirmationDialogState) => {
  store.setState(() => ({ confirmation: params }));
};

export const closeConfirmDialog = () => {
  store.state?.confirmation?.handleClose?.();
  store.setState(() => ({
    confirmation: null,
  }));
};

export const useConfirmationDialog = () => useStore(store, (state) => state.confirmation);
