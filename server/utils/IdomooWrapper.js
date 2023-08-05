import axios from 'axios';

export default async function getToken() {
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
        return data.access_token;
    } catch (error) {
        throw new Error(`Error fetching token: ${error.message}`);
    }
}


const generateBody = async (params) =>{
    const {format,quality,height, fps = 15} = params;
    const token = getToken();
    const options = {
        method: 'POST',
        url: `${process.env.IDOMOOURL}/storyboards/generate`,
        headers: {
            'x-idomoo-api-mode': '',
            Signature: token,
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: ''
        },
        data: {
            storyboard_id: process.env.STORYBOARD_ID,
            output_file_name: `${process.env.ACCOUNT_ID}_generate`,
            output: {
                video: [
                    {
                    format,
                    quality,
                    height
                    }
                ],
                gif: [
                    {
                    height,
                    time: 0,
                    fps,
                    loop: 0,
                    landing_page_id: 0,
                    }
                ],
                jpg: [
                    {
                    height,
                    time: 0,
                    }
                ]
            },
            data,
        }
    };

    try {
        const { data } = await axios.request(options);
        console.log(data);
    } catch (error) {
    console.error(error);
    }
}