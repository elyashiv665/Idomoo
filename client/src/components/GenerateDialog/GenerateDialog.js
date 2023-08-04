import './GenerateDialog.css';
import MediaUploadButton from './MediaUpload/MediaUpload';
import { useState } from 'react';
import RGBSelect from './RGBSelect/RGBSelect'
import TextPicker from './TextPicker/TextPicker'
import AppSelect from './AppSelect/AppSelect';

const formats = ['HLS', 'MP4','GIF'];
const qualities = ['BEST', 'BETTER','GOOD'];
const resolutions = [{
  id: '480X270',
  label: '25%(480 X 270)'
},{
  id: '640X360',
  label: '33.33%(640X360)'
},{
  id: '966X650',
  label: '50%(960 X 540)'
},{
  id: '1280X720',
  label: '66.67%(1280 X 720)'
},{
  id: '1920x1080',
  label: '100%(1920 X 1080)'
}]


const GenerateDialog = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [texts, setTexts] = useState([]);
  const [resolution, setResolution] = useState(resolutions[0]);
  const [quality, setQuality] = useState(qualities[0]);
  const [format, setFormat] = useState(formats[0]);
  const [color, setColor] = useState('#000000');
  const titleText = 'Enter the details below in order to generate your video';

  const handleFilesSelect = (files) => {
    setSelectedFiles([...selectedFiles, ...files]);
  };

  return (
      <div className='GenerateDialogContainer'>
        <div className='GenerateDialogTitle'>{titleText}</div>
        <div className='GenerateTopRow'>
          <MediaUploadButton onFilesSelect={(files) => handleFilesSelect(files)} selectedFiles={selectedFiles}/>
          <RGBSelect color={color} setColor={(data) => setColor(data)}/>
          <div className='colorBlock' style={{backgroundColor: color}}/>
        </div>
        <TextPicker texts={texts} setTexts={setTexts}/>
        <div className='GenerateSelectRow'>
          <AppSelect options={resolutions} value={resolution} setValue={setResolution} label={"Resolution"}/>
        </div>
      </div>
    );
  };
  
  export default GenerateDialog;