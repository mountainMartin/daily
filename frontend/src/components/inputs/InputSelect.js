import React from 'react';
import _ from 'lodash';
import MUIAutocomplete from '@mui/material/Autocomplete';
import MUITextField from '@mui/material/TextField';

export const InputSelect = (props) => {
  return (
    <>
      <MUIAutocomplete
        fullWidth={props.fullWidth ?? false}
        autoFocus={props.autoFocus ?? false}
        required={props.required ?? false}
        disabled={props.disabled}
        error={props.error}
        size={props.size ? props.size : 'small'}
        disableClearable={props.disableClearable ?? false}
        name={props.name}
        options={props.options}
        value={props.value === undefined ? null : props.value ?? null}
        onChange={props.onChange}
        defaultValue={props.defaultValue}
        getOptionLabel={(item) => (item.label ? item.label.toString() : '')}
        style={props.style}
        isOptionEqualToValue={(option, value) => {
          if (option === value) {
            return true;
          }
          if (typeof option !== typeof value) {
            return false;
          }
          if (typeof option.value !== typeof value.value) {
            return false;
          }
          if (typeof option.value !== 'object') {
            return option.value === value.value;
          }
          return _.isEqual(option.value, value.value);
        }}
        renderInput={(params) => (
          <MUITextField
            variant={props.variant}
            placeholder={props.placeholder}
            {...params}
            label={props.label}
            required={props.required}
            color={props.color}
            helperText={props.helperText}
          />
        )}
      />
    </>
  );
};
