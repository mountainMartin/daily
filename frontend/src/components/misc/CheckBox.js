import React from 'react';
import MUICheckbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';

export const Checkbox = (props) => {
  return (
    <FormControlLabel
      defaultChecked={props.defaultChecked}
      label={props.label}
      disabled={props.disabled}
      control={
        <MUICheckbox
          checked={props.checked}
          onChange={props.onChange}
          sx={props.sx}
        />
      }
      labelPlacement={props.labelPlacement ?? 'end'}
      checked={props.checked}
      onClick={props.onClick}
    />
  );
};
