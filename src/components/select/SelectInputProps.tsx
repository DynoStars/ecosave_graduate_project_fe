import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

interface SelectInputProps {
  label: string;
  options: string[];
  value: string;
  onChange: (event: SelectChangeEvent) => void;
}

const SelectInputProps: React.FC<SelectInputProps> = ({ label, options, value, onChange }) => {
  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel id={`select-${label}`}>{label}</InputLabel>
      <Select
        labelId={`select-${label}`}
        id={`select-${label}`}
        value={value}
        label={label}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectInputProps;
