import React, { useState } from 'react';
import { IconButton } from '../icon-buttons/IconButton';
import { InputAdornment, TextField } from '@mui/material';
import { HiEye, HiEyeOff } from 'react-icons/hi';

export const InputPassword = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      fullWidth={props.fullWidth ?? false}
      autoFocus={props.autoFocus ?? false}
      required={props.required ?? false}
      disabled={props.disabled ?? false}
      error={props.error ?? false}
      type={showPassword ? 'text' : 'password'}
      color={props.color ?? 'primary'}
      size={props.size ?? 'small'}
      label={props.label ?? ''}
      value={props.value ?? ''}
      onChange={props.onChange}
      inputProps={{
        minLength: props.minLength ?? 3,
        maxLength: props.maxLength ?? 100,
      }}
      InputProps={{
        sx: { paddingRight: 0 },
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              disabled={props.disabled}
              label={showPassword ? 'Dölj' : 'Visa'}
              size='medium'
              onClick={() => setShowPassword(!showPassword)}
              icon={showPassword ? <HiEyeOff /> : <HiEye />}
            />
          </InputAdornment>
        ),
      }}
      helperText={props.helperText}
    />
  );
};
