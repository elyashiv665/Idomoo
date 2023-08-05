import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function AppSelect({options, selectedOption, setValue, label, type = 'object'}) {

  const handleChange = (event) => {
    setValue(type === 'object' ? options.find(option => option.value === event.target.value): event.target.value);
  };
  return (
    <div>
      <FormControl sx={{maxWidth: "200px"}}>
        <InputLabel>{label}</InputLabel>
        <Select
          value={type === 'object' ? selectedOption?.value : selectedOption}
          onChange={handleChange}
        >
          {options.map(option => <MenuItem value={type === 'object' ? option.value: option}>{type === 'object' ? option.label: option}</MenuItem>)}
        </Select>
      </FormControl>
    </div>)
};