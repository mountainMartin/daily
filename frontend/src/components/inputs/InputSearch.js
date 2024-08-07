import React from 'react';
import MUITextField from '@mui/material/TextField';
import MUIInputAdornment from '@mui/material/InputAdornment';
import { IconButton } from '../icon-buttons/IconButton';
import { CloseIcon, SearchIcon } from '../../app/AppIcons';

export const InputSearch = (props) => {
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
      label={props.label ?? 'Sök'}
      value={props.value ?? ''}
      onChange={props.onChange}
      helperText={props.helperText}
      sx={props.style}
      inputProps={{
        minLength: props.minLength ?? 3,
        maxLength: props.maxLength ?? 50,
      }}
      InputProps={{
        endAdornment: (
          <MUIInputAdornment position='end'>
            <IconButton
              label='Rensa'
              onClick={props.onSearchClick}
              icon={props.value === '' ? <SearchIcon /> : <CloseIcon />}
            />
          </MUIInputAdornment>
        ),
      }}
    />
  );
};
