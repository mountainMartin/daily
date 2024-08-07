import React from 'react';
import MUITextField from '@mui/material/TextField';

export const InputText = (props) => {
  return (
    <MUITextField
      fullWidth={props.fullWidth ?? false}
      autoFocus={props.autoFocus ?? false}
      required={props.required ?? false}
      disabled={props.disabled ?? false}
      error={props.error}
      type={props.type ?? 'text'}
      color={props.color ?? 'primary'}
      size={props.size ?? 'small'}
      sx={props.style}
      style={props.style}
      label={props.label ?? ''}
      value={props.value === undefined ? '' : props.value ?? ''}
      onChange={props.onChange}
      helperText={props.helperText}
      inputProps={{
        minLength: props.minLength ?? 0,
        maxLength: props.maxLength ?? 100,
      }}
      multiline={props.multiRows > 0 ?? false}
      rows={props.multiRows}
      maxRows={props.multiRows}
    />
  );
};
