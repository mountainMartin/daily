import React, { useState, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const InputMultiSelect = ({ label, options, onChange, ...props }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedOptions(value);
  };

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions, onChange]);

  return (
    <FormControl
      size='small'
      fullWidth={props.fullWidth ?? false}
      sx={props.style}
    >
      <InputLabel id='demo-multiple-checkbox-label'>{label ?? ''}</InputLabel>
      <Select
        size='small'
        labelId='demo-multiple-checkbox-label'
        id='demo-multiple-checkbox'
        multiple
        value={selectedOptions ?? []}
        onChange={handleChange}
        input={<OutlinedInput label='Anställda' />}
        renderValue={(selected) =>
          selected
            .map(
              (optionValue) =>
                options.find((option) => option.value === optionValue).label
            )
            .join(', ')
        }
        MenuProps={MenuProps}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{ height: '30px', padding: 0 }}
          >
            <Checkbox checked={selectedOptions.includes(option.value)} />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
