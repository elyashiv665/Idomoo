import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './AppSelect.css';

export default function AppSelect({options, selectedOption, setValue, label}) {

  const handleChange = (event) => {
    setValue(options.find(option => option.value === event.target.value));
  };

  return (
    <div className={'AppSecletContainer'}>
      <FormControl sx={{maxWidth: "200px"}}>
        <InputLabel>{label}</InputLabel>
        <Select
          value={selectedOption?.value}
          // label={selectedOption?.label}
          onChange={handleChange}
        >
          {options.map(option => <MenuItem value={option.value}>{option?.label}</MenuItem>)}
        </Select>
      </FormControl>
    </div>)
};