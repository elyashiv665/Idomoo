import './App.css';
import GenerateDialog from './components/GenerateDialog/GenerateDialog';
import {useState, useMemo} from 'react';
import ErrorComponent from './components/ErrorComponent/ErrorComponent';
import Loader from './components/Loader/Loader';
import Player from './components/Player/Player';
import  { handleGenerate} from './utils/tools'

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const [format, setFormat] = useState();
  const [generateRes, setGenerateRes] = useState({});
  const videoUrl = generateRes?.output?.[format === 'gif' ? 'gif':'video'][0]?.links?.url;

  const onBack = () => {
    // setError();
    // setIsError(false);
    // setIsSuccess(false);
    // setIsLoading(false);
    // setGenerateRes({});
    // setFormat();
    window.location.reload(false);
  };

  const handleGenerateClick = (data) => {
    handleGenerate({...data,setIsError,setError, setIsLoading, setIsSuccess, setGenerateRes})
  }
  console.log(isError, isLoading, isSuccess)
  const content = useMemo(() => {
    if(isLoading && Object.keys(generateRes).length > 0 && !isSuccess){
      return  <Loader isAvailableurl={generateRes.check_status_url} setIsError={setIsError} setError={setError} setIsLoading={setIsLoading} setIsSuccess={setIsSuccess}/>
    }
    if(isError){
      return <ErrorComponent error={error} onBack={onBack}/>;
    }
    if(isSuccess){
      return <Player format={format} videoUrl={videoUrl} onBack={onBack}/>;
    }
    return <GenerateDialog setParantFormat={setFormat} handleGenerate={(data) => {handleGenerateClick(data)}}/>;
  }, [isError, isLoading, isSuccess, generateRes])
  return (
    <div className="App">
      <header className="App-header">
        Idomoo home assignment
      </header>
      {content}
      <div className='end'/>
    </div>
  );
}

export default App;
