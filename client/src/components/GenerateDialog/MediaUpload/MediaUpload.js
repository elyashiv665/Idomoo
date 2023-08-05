import React from 'react';
import './MediaUpload.css';
import imageCompression from 'browser-image-compression';
async function fileCompress(imageFile) {

  const options = {
    maxSizeMB: 0.05,
    maxWidthOrHeight: 1920
  }
  try {
    const compressedFile = await imageCompression(imageFile, options);
    return compressedFile;
  } catch (error) {
    console.log(error);
  }

}
function MediaUploadButton({ setMedia1, setIsMedia1Color }) {
  const handleFileChange = async (e) => {
    const fileInput = e.target;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const allowedTypes = ['image/jpeg', 'image/jpg'];
      if (allowedTypes.includes(file.type)) {
        
        const reader = new FileReader();
        reader.onloadend = () => {
          setMedia1(reader.result);
          setIsMedia1Color(false);
        };
        reader.readAsDataURL(await fileCompress(file));
       
      } else {
        alert('Please choose a JPG file.');
        // Clear the file input so that the user can select a valid file.
        fileInput.value = '';
      }
    }
  };

  return (
    <div>
      <div>{`Media 1`}</div>
      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept=".jpg, .jpeg" // Set the accepted file types to JPG
        multiple
      />
      <button className='uploadButton' onClick={() => document.getElementById('fileInput').click()}>Upload</button>
    </div>
  );
};

export default MediaUploadButton;
