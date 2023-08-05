import { useState } from 'react';
import { SketchPicker } from 'react-color';
import './RGBSelect.css';

function RGBSelect ({color, setColor, setIsMedia1Color}){
  const [open, setOpen] = useState(false);

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
    setIsMedia1Color(true);
  };

  return (
    <div className='RGBcontainer'>
      <button className='button' onClick={() => setOpen(!open)}>CHOOSE COLOR</button>
      {open && <SketchPicker color={color} onChange={handleColorChange} className='picker'/>}
    </div>
  );
};

export default RGBSelect;