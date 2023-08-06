
async function updateStatus({url, setIsAvailable}) {
    if(!url){
        return;
    }
    await fetch(`videoStatus?url=${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setIsAvailable(data);
      })
      .catch((error) => {
        setIsAvailable('ERROR');
        throw new Error(error);
      });
  }

async function fetchVideo({url, setVideo, setIsSuccess, setIsLoading}) {
    fetch(`videoContent?url=${url}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        }
    }).then((response) => response.json())
        .then((data) => {
            setVideo(data);
            setIsSuccess(true);
            setIsLoading(false);
        })
        .catch((error) => {
            throw new Error(error);
        });
}

async function checkIsAvailabelContent({url, setIsAvailable, setIsError,setError, setIsLoading}){
    try{
        const statusRes = await updateStatus({url, setIsAvailable});
        switch(statusRes){
            case'ERROR':
            case'NOT_EXIST':
                setIsError(true);
                setError('not exist')
                setIsLoading(false);
                break;
            case'VIDEO_AVAILABLE':
                setIsAvailable(true);
                break;
            case'IN_PROCESS':
            case "IN_QUEUE":
            case "RENDERING":
            default:
                break;
        
        }
    }catch(error){
        setIsError(true);
        setError(error);
        setIsLoading(false);
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
        console.log('catch');
        setIsError(true);
        setError(error?.message);
        setIsLoading(false);
      });
  }

    const onBack = ({setError, setIsError, setIsLoading, setIsSuccess}) => {
        setError('');
        setIsError(false);
        setIsSuccess(false);
        setIsLoading(false);
    };

   

export {onBack, handleGenerate, fetchVideo, checkIsAvailabelContent};
  