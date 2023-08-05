import './GenerateDialog.css';
import MediaUploadButton from './MediaUpload/MediaUpload';
import { useState } from 'react';
import RGBSelect from './RGBSelect/RGBSelect'
import TextPicker from './TextPicker/TextPicker'
import AppSelect from './AppSelect/AppSelect';

const formats = [{label: "HLS", value:"hls"}, {label: "MP4", value: "mp4"}, {label: "GIF",value:'gif'}];
const videoQualities = [{value: 23, label:'BEST'}, {value:26 ,label: 'BETTER'},{value: 29, label: 'GOOD'}];
const GIFQualities = ['16', '31','64','128','256',]
const fpsOptions = Array.from({length: 30}, (_, i) => i + 1)
const resolutions = [{
  value: '1080',
  label: '100%(1920 X 1080)'
  },{
  value: '720',
  label: '66.67%(1280 X 720)'
  },{
  value: '650',
  label: '50%(960 X 540)'
  },{
  value: '360',
  label: '33.33%(640X360)'
  },{
  value: '270',
  label: '25%(480 X 270)'
  }]


const GenerateDialog = ({handleGenerate}) => {
  const [text, setText] = useState('');
  const [resolution, setResolution] = useState(resolutions[0]);
  const [videoQuality, setVideoQuality] = useState(videoQualities[0]);
  const [gifQuality, setGifQuality] = useState(GIFQualities[0]);
  const [format, setFormat] = useState(formats[0]);
  const [media1, setMedia1] = useState('rgb(0, 0, 0)');
  const[isMedia1Color, setIsMedia1Color] = useState(true);
  const [fps, setFps] = useState(fpsOptions[15]);
  const titleText = 'Enter the details below in order to generate your video';

  return (
      <div className='GenerateDialogContainer'>
        <div className='GenerateDialogTitle'>{titleText}</div>
        <div className='GenerateTopRow'>
          <MediaUploadButton setMedia1={setMedia1} setIsMedia1Color={setIsMedia1Color}/>
          <RGBSelect color={media1} setColor={(data) => setMedia1(data)} setIsMedia1Color={setIsMedia1Color}/>
          {isMedia1Color ? <div className='media1Display' style={{backgroundColor: media1}}/>:<img className='media1Display' src={media1} alt=''/>}
        </div>
        <TextPicker texts={text} setText={setText}/>
        <div className='GenerateSelectRow'>
          <div className='generateSelectContainer'>
            <AppSelect options={formats} selectedOption={format} setValue={setFormat} label={"Format"}/>
          </div>
          <div className='generateSelectContainer'>
            <AppSelect options={resolutions} selectedOption={resolution} setValue={setResolution} label={"Resolution"}/>
          </div>
          <div className='generateSelectContainer'>
            {format.value === "gif" ? 
            <AppSelect options={GIFQualities} selectedOption={gifQuality} setValue={setGifQuality} label={"Quality"} type={'array'}/>:
            <AppSelect options={videoQualities} selectedOption={videoQuality} setValue={setVideoQuality} label={"Quality"}/>
            }
          </div>
          <div className='generateSelectContainer'>
            {format.value === "gif" &&  <AppSelect options={fpsOptions} selectedOption={fps} setValue={setFps} label={"FPS"} type={'array'}/>}
          </div>
        </div>
        <button className='generateDialogButton' onClick={() => handleGenerate({text,resolution, videoQuality,gifQuality,format,media1,fps})}>GENERATE</button>


      </div>
    );
  };
  
  export default GenerateDialog;