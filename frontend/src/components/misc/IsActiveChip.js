import React from 'react';
import MUIChip from '@mui/material/Chip';

export const IsActiveChip = ({ isActive, ...props }) => {
  return (
    <MUIChip
      disabled={props.disabled ?? false}
      size={props.size ?? 'small'}
      color={isActive ? 'success' : 'error'}
      variant={props.variant ?? 'outlined'}
      label={isActive ? 'Aktiv' : 'Inaktiv'}
      onClick={props.onClick}
      sx={{ minWidth: '80px' }}
    />
  );
};
