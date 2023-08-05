import './App.css';
import GenerateDialog from './components/GenerateDialog/GenerateDialog';
function handleGenerate(params) {
  const {text,resolution, videoQuality,gifQuality,format,media1,fps} = params;
  const apiUrl = '/video';
  const requestBody = {
    data: {Text1: text, Media1: media1},
    resolutionHeight: resolution.value,
    quality: format.value === 'gif' ? gifQuality : videoQuality.value,
    format: format.value,
    fps
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data here
      console.log('Response:', data);
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch
      console.error('Error:', error);
    });
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Idomoo home assignment
      </header>
      <GenerateDialog handleGenerate={handleGenerate}/>
      <div className='end'/>
    </div>
  );
}

export default App;
