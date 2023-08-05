import  {checkIsAvailabelContent, fetchVideo} from '../../utils/tools'
import {useEffect, useState} from 'react';

export default function Loader({isAvailableurl,videoUrl,video, setVideo, setIsError,setError, setIsLoading, setIsSuccess}){
    const [isAvailable, setIsAvailable] = useState(false);
   
    useEffect(() => {
        if(isAvailable === 'VIDEO_AVAILABLE'){
            try{
                fetchVideo({url: videoUrl, setVideo, setIsLoading, setIsSuccess})
            }catch(error){
                setIsLoading(false);
                setIsError(true);
                setError(error.message);
            }
        }
    }, [isAvailable]);
    
    if(!isAvailable || isAvailable === 'IN_PROCESS' || isAvailable === 'IS_QUEUE' || isAvailable === "READING"){
        checkIsAvailabelContent({url: isAvailableurl, setIsAvailable, setIsError,setError, setIsLoading, setIsSuccess});
    }
   
   
    return <div>loading</div>;
}