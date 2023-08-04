import './GenerateDialog.css';
import MediaUploadButton from './MediaUpload/MediaUpload';
import { useState } from 'react';
import RGBSelect from './RGBSelect/RGBSelect'
import TextPicker from './TextPicker/TextPicker'

const GenerateDialog = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [texts, setTexts] = useState([]);
  const [color, setColor] = useState('#000000');
  const titleText = 'Enter the details below in order to generate your video';

  const handleFilesSelect = (files) => {
    setSelectedFiles([...selectedFiles, ...files]);
  };

  return (
      <div className='GenerateDialogContainer'>
        <div className='GenerateDialogTitle'>{titleText}</div>
        <div className='row'>
          <MediaUploadButton onFilesSelect={(files) => handleFilesSelect(files)} selectedFiles={selectedFiles}/>
          <RGBSelect color={color} setColor={(data) => setColor(data)}/>
          <div className='colorBlock' style={{backgroundColor: color}}/>
        </div>
        <TextPicker texts={texts} setTexts={setTexts}/>
      </div>
    );
  };
  
  export default GenerateDialog;