
async function updateStatus({url, availableStatus, setIsError,setError, setIsLoading,  setIsSuccess}) {
  if(availableStatus){
    return;
  }
  let status = false;
  let count = 0;
  while(!status){
    try{
      
      const res = await fetch(`videoStatus?url=${url}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if(res.status !== 200){
        throw new Error(res.statusText);
      }
      const jsonRes = await res.json();
      switch(jsonRes){
            case'ERROR':
            case'NOT_EXIST':
                setIsError(true);
                setError('not exist')
                setIsLoading(false);
                status = true;
                break;
            case'VIDEO_AVAILABLE':
                setIsSuccess(true);
                status = true;
                break;
            case'IN_PROCESS':
            case "IN_QUEUE":
            case "RENDERING":
            default:
              await new Promise(resolve => setTimeout(resolve, parseInt(process.env.REACT_APP_LOADER_TIMEOUT)));
              await updateStatus({url, availableStatus:status, setIsError,setError, setIsLoading}) 
              break;
        
        }
    }catch(error){
      status = true;
      setIsError(true);
      setError(error);
      setIsLoading(false);
  }
  if(count > parseInt(process.env.REACT_APP_MAX_UPDATE_STATUS_TRIES)){
    setIsError(true);
    setError('to many retries update video status');
    setIsLoading(false);
    break;
  }
  count ++;
}

}

function handleGenerate({text,resolution, videoQuality,gifQuality,format,media1,fps, setIsLoading, setIsError, setError, setGenerateRes}) {
    const apiUrl = '/video';
    const requestBody = {
      data: {Text1: text, Media1: media1},
      resolutionHeight: resolution.value,
      quality: format.value === 'gif' ? gifQuality : videoQuality.value,
      format: format.value,
      fps
    };
    setIsLoading(true);
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    }).then((response) => {
      if(response.status !== 202){
        throw new Error(response.statusText);        
      }
      return response.json()
    }).then((data) => {
        setGenerateRes(data);
      })
      .catch((error) => {
        setIsError(true);
        setError(error?.message);
        setIsLoading(false);
      });
  }


export {handleGenerate, updateStatus};
  