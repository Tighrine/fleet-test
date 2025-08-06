import { Store, useStore } from '@tanstack/react-store';
import type { ErrorDialogState } from './type';

const store = new Store<{ error: ErrorDialogState | null }>({
  error: {
    open: false,
    errorDetailMessage: '',
    errorMessage: '',
    title: 'Error occured',
  },
});

export const showErrorDialog = (params: ErrorDialogState) => {
  store.setState(() => ({ error: params }));
};

export const closeErrorDialog = () => {
  store.state?.error?.handleClose?.();
  store.setState(() => ({
    error: null,
  }));
};

export const useErrorDialog = () => useStore(store, (state) => state.error);
