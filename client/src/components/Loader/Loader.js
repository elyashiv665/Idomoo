import  {updateStatus} from '../../utils/tools'
import {useEffect} from 'react';
import './Loader.css'
export default function Loader({isAvailableurl, setIsError,setError, setIsLoading, setIsSuccess, setAvailableStatus}){

    useEffect(() => {
        updateStatus({url: isAvailableurl, setIsError,setError, setIsLoading, setIsSuccess, setAvailableStatus});   
      }, []);
    return  <div className="loader-container">
        <div className="loader"></div>
    </div>;
}