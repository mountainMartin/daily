import React from 'react';
import MUIDialog from '@mui/material/Dialog';
import MUIDialogTitle from '@mui/material/DialogTitle';
import MUIDialogContent from '@mui/material/DialogContent';
import MUIDialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { SubmitButton } from '../buttons/SubmitButton';
import { CancelButton } from '../buttons/CancelButton';
import { CloseIconButton } from '../icon-buttons/CloseIconButton';

export const SubmitModal = ({ open, title, onSubmit, children, onClose }) => {
  return (
    <MUIDialog open={open}>
      <MUIDialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography>{title ?? 'title'}</Typography>
        <CloseIconButton onClick={onClose} />
      </MUIDialogTitle>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <MUIDialogContent>{children}</MUIDialogContent>
        <MUIDialogActions>
          <SubmitButton />
          <CancelButton onClick={onClose} />
        </MUIDialogActions>
      </form>
    </MUIDialog>
  );
};
