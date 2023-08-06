import './Player.css'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

export default function Player({onBack, videoUrl}){
    const player_options = {
        size: "hd",
        src: videoUrl,
      };
    setTimeout(() => window.idmPlayerCreate(player_options, "idm_player"), 300);
    
    return <div className='rootPlayer'>
        <div className='backContainer' onClick={() => onBack()}>
            <KeyboardReturnIcon />
            <div className='backText'>Back</div> 
        </div>
        <div id="idm_player"></div>

        </div>
}