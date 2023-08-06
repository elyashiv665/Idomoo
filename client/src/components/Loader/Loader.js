import  {updateStatus, fetchVideo} from '../../utils/tools'
import {useEffect, useState} from 'react';

export default function Loader({isAvailableurl,videoUrl,video, setVideo, setIsError,setError, setIsLoading, setIsSuccess}){
    const [availableStatus, setAvailableStatus] = useState(false);

    useEffect(() => {
        updateStatus({url: isAvailableurl, setAvailableStatus, setIsError,setError, setIsLoading, setIsSuccess});   
      }, []);
    
    useEffect(() => {
        if(availableStatus === 'VIDEO_AVAILABLE'){
            try{
                fetchVideo({url: videoUrl, setVideo, setIsLoading, setIsSuccess,  setIsError,setError})
            }catch(error){
                setIsLoading(false);
                setIsError(true);
                setError(error);
            }
        }else{

        }
    }, [availableStatus]);
   
    return <div>loading</div>;
}