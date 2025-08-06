export type ErrorDialogState = {
  open?: boolean;
  title?: string;
  errorDetailMessage: string;
  errorMessage?: string;
  handleClose?: () => void;
};