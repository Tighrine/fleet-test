export type ConfirmationDialogState = {
  open?: boolean;
  title?: string;
  message?: string;
  confirm: () => void;
  handleClose?: () => void;
};