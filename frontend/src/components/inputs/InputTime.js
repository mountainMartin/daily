import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export const InputTime = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        autoFocus={props.autoFocus ?? false}
        disabled={props.disabled ?? false}
        label={props.label}
        value={props.value ?? null}
        onChange={props.onChange}
        format={'HH:mm'}
        ampm={false}
        timeSteps={props.timeSteps ?? { hours: 1, minutes: 1 }}
        slotProps={{
          textField: {
            required: props.required ?? false,
            error: props.error ?? false,
            color: props.color ?? 'primary',
            size: props.size ?? 'small',
            fullWidth: props.fullWidth ?? false,
            helperText: props.helperText ?? false,
          },
        }}
      />
    </LocalizationProvider>
  );
};
