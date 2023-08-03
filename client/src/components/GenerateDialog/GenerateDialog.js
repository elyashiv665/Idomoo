import './GenerateDialog.css';

const GenerateDialog = () => {
  const titleText = 'Enter the details below in order to generate your video';
  return (
      <div className='container'>
        <div className='title'>{titleText}</div>
      </div>
    );
  };
  
  export default GenerateDialog;