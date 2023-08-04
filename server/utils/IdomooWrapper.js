async function getToken() {
const authHeader = `Basic ${btoa(`${process.env.ACCOUNT_ID}:${process.env.SECRET_KEY}`)}`;

  try {
    const response = await fetch(process.env.IDOMOOURL, {
      headers: {
        Authorization: authHeader,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch token.');
    }

    const data = await response.json();
    return data.access_token; // Assuming the response has a 'token' property
  } catch (error) {
    throw new Error(`Error fetching token: ${error.message}`);
  }
}