import axios from 'axios';
let tokenData;

function calculateDateForXTimeFromNow(msecondsFromNow) {
    const currentTimeInMilliseconds = new Date().getTime();
    const futureTimeInMilliseconds = currentTimeInMilliseconds + msecondsFromNow;
    const futureDate = new Date(futureTimeInMilliseconds);
  
    return futureDate;
  }

export async function getToken() {
    if (tokenData && tokenData.expires_at < new Date().getTime()){
        return tokenData.access_token;
    }else{
        const authHeader = `Basic ${btoa(`${process.env.ACCOUNT_ID}:${process.env.SECRET_KEY}`)}`;
    
        try {
            const response = await axios.post(`${process.env.IDOMOOURL}/oauth/token`, null, {
            headers: {
                Authorization: authHeader
            },
            });
            if (!response.statusText) {
                throw new Error('Failed to fetch token.');
            }
    
            const data = response.data;
            tokenData=data;
            tokenData.expires_at = calculateDateForXTimeFromNow(data.expires_in)
            return data.access_token;
        } catch (error) {
            throw new Error(`Error fetching token: ${error.message}`);
        }
    }
    
}

function filterJsonKeys(jsonData, format) {
    const filteredData = {};
    for (const key in jsonData) {
      if (key === format) {
        filteredData[key] = jsonData[key];
      }
    }
    return filteredData;
  }

const generateBody = (params) =>{
    const {format,quality,resolutionHeight, fps = 15, data} = params;
   
    const outputObj = {
        video: [
            {
                format,
                quality: parseInt(quality),
                height: parseInt(resolutionHeight)
            }
        ],
        gif: [
            {
                height: parseInt(resolutionHeight),
                time: 0,
                fps:parseInt(fps),
                loop: 0
            }
        ]
    }
    const output = filterJsonKeys(outputObj, format==='gif' ? 'gif':'video');
    const reqData = Object.entries(data).map((entry, index) => {
        const [key, val] = entry; 
        return  {key,val};
    })
    return {
        storyboard_id: parseInt(process.env.STORYBOARD_ID),
        output,
        data: reqData
    };

    
}
export async function generateVideo(params) {
    try {
        const body = generateBody(params);
        const response = await callIdomoo(`${process.env.IDOMOOURL}/storyboards/generate`, body, 'post');
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error generateVideo`);
        
    }

}


export async function callIdomoo( url, body, method){
    try{
        const token = await getToken();
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const options = {
            method: method,
            url,
            headers
          };
        if(body){
            options.data = body;
        }
        const response = await axios(options);
        return response;
    }catch(err){
        throw new Error(`error call Idomoo: ${error.message}`);
    }
}