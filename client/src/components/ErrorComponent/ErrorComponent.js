import './ErrorComponent.css';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

export default function ErrorComponent({error, onBack}) {

  return (
    <div>
        <div className='backContainer' onClick={() => onBack()}>
            <KeyboardReturnIcon />
            <div className='backText'>Back</div> 
        </div>
        {error}
    </div>)
};