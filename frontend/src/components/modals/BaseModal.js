import React from 'react';
import MUIDialog from '@mui/material/Dialog';
import MUIDialogTitle from '@mui/material/DialogTitle';
import MUIDialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { CloseIconButton } from '../icon-buttons/CloseIconButton';

export const BaseModal = ({ children, open, onClose, title }) => {
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
      <MUIDialogContent>{children}</MUIDialogContent>
    </MUIDialog>
  );
};
