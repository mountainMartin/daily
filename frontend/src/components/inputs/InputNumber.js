import React from 'react';
import MUITextField from '@mui/material/TextField';

export const InputNumber = React.forwardRef((props, ref) => {
  const invalidKeys = (key) => {
    switch (key) {
      case 'e':
        return true;
      case '-':
        if (props.allowNegative) {
          return false;
        } else {
          return true;
        }
      case '+':
        return true;
      default:
        return false;
    }
  };

  const handleChange = (event) => {
    let value = event.target.value;

    if (value && !/^\d*$/.test(value)) {
      event.target.value = props.value ?? '';
      return;
    }

    if (props.min !== undefined && +value < props.min) {
      event.target.value = props.min;
      value = props.min.toString();
    }

    if (props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <MUITextField
      fullWidth={props.fullWidth ?? false}
      autoFocus={props.autoFocus ?? false}
      required={props.required ?? false}
      disabled={props.disabled ?? false}
      error={props.error ?? false}
      type='text'
      color={props.color ?? 'primary'}
      size={props.size ?? 'small'}
      sx={props.style}
      style={props.style}
      label={props.label ?? ''}
      value={props.value ?? ''}
      inputRef={ref}
      onChange={handleChange}
      helperText={props.helperText}
      inputProps={{
        maxLength: props.maxLength,
        min: props.min ?? -2147483647,
        max: props.max ?? 2147483647,
        pattern: '\\d*',
        onKeyDown: (e) => invalidKeys(e.key) && e.preventDefault(),
      }}
    />
  );
});
