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
    setError();
    setIsError(false);
    setIsSuccess(false);
    setIsLoading(false);
    setGenerateRes({});
    setFormat();
  };

  const handleGenerateClick = (data) => {
    handleGenerate({...data,setIsError,setError, setIsLoading, setIsSuccess, setGenerateRes})
  }
  const content = useMemo(() => {
    return <div>
       {isLoading && Object.keys(generateRes).length && !isSuccess && <Loader isAvailableurl={generateRes.check_status_url} setIsError={setIsError} setError={setError} setIsLoading={setIsLoading} setIsSuccess={setIsSuccess}/>}
      {isError && <ErrorComponent error={error}/>}
      {isSuccess && <Player format={format} videoUrl={videoUrl} onBack={onBack}/>}
      {!isLoading && !isError && !isSuccess && <GenerateDialog setParantFormat={setFormat} handleGenerate={(data) => {handleGenerateClick(data)}}/>}
    </div>
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
