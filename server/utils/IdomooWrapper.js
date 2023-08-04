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