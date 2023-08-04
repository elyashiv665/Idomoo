import TextField from '@mui/material/TextField';
import './TextPicker.css';

function TextPicker({text, setText}){

return <div className='textPickerContainer'>
            <TextField
                label="Text 1" 
                variant="standard"
                value={text}
                onChange={(e => setText(e.target.value))}
                placeholder={'Enter some text...'}
            />
        </div>;
};

export default TextPicker;