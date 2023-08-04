import './GenerateDialog.css';
import MediaUploadButton from './MediaUpload/MediaUpload';
import { useState } from 'react';
import RGBSelect from './RGBSelect/RGBSelect'
import TextPicker from './TextPicker/TextPicker'
import AppSelect from './AppSelect/AppSelect';

const formats = [{value: 'HLS', label: 'HSL'}, {value: 'MP4', label: 'MP4'},{value: 'GIF', label: 'GIF'}];
const qualities = [{value: 23, label:'BEST'}, {value:26 ,label: 'BETTER'},{value: 29, label: 'GOOD'}];
const resolutions = [{
  value: '480X270',
  label: '25%(480 X 270)'
},{
  value: '640X360',
  label: '33.33%(640X360)'
},{
  value: '966X650',
  label: '50%(960 X 540)'
},{
  value: '1280X720',
  label: '66.67%(1280 X 720)'
},{
  value: '1920x1080',
  label: '100%(1920 X 1080)'
}]


const GenerateDialog = () => {
  const [selectedFile, setSelectedFile] = useState([]);
  const [text, setText] = useState([]);
  const [resolution, setResolution] = useState(resolutions[0]);
  const [quality, setQuality] = useState(qualities[0]);
  const [format, setFormat] = useState(formats[0]);
  const [color, setColor] = useState('#000000');
  const titleText = 'Enter the details below in order to generate your video';
 
  const handleGenerate = () =>{
    console.log('selectedFile', selectedFile);
  }

  return (
      <div className='GenerateDialogContainer'>
        <div className='GenerateDialogTitle'>{titleText}</div>
        <div className='GenerateTopRow'>
          <MediaUploadButton setSelectedFile={setSelectedFile}/>
          <RGBSelect color={color} setColor={(data) => setColor(data)}/>
          {<div className='colorBlock' style={{backgroundColor: color}}/>}
        </div>
        <TextPicker texts={text} setText={setText}/>
        <div className='GenerateSelectRow'>
          <AppSelect options={resolutions} selectedOption={resolution} setValue={setResolution} label={"Resolution"}/>
          <AppSelect options={qualities} selectedOption={quality} setValue={setQuality} label={"Quality"}/>
          <AppSelect options={formats} selectedOption={format} setValue={setFormat} label={"Format"}/>
        </div>
        <button className='generateDialogButton' onClick={() => handleGenerate()}>GENERATE</button>


      </div>
    );
  };
  
  export default GenerateDialog;