import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { sv } from 'date-fns/locale';

export const InputDate = (props) => {
  return (
    <LocalizationProvider adapterLocale={sv} dateAdapter={AdapterDateFns}>
      <DatePicker
        autoFocus={props.autoFocus ?? false}
        disabled={props.disabled}
        label={props.label}
        value={new Date(props.value) ?? null}
        onChange={props.onChange}
        inputFormat={props.inputFormat ?? 'yyyy-MM-dd'}
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
