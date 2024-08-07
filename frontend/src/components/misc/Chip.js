import React from 'react';
import MUIChip from '@mui/material/Chip';

export const Chip = (props) => {
  return (
    <MUIChip
      disabled={props.disabled ?? false}
      size={props.size ?? 'small'}
      color={props.color ?? 'primary'}
      variant={props.variant ?? 'outlined'}
      label={props.label ?? 'chip-label'}
      onClick={props.onClick}
      sx={{ padding: '5px' }}
    />
  );
};
