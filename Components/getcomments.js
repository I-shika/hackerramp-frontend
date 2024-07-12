import axios from 'axios';

export const getComments = async (offset, limit) => {
  try {
    const url = `http://127.0.0.1:8000/diva/community/show/?offset=${offset}&limit=${limit}`;
    const response = await axios.get(url,{
        params: {  start:offset,
                 end:limit 
    }
    })
    console.log(response.data.comment)
    return response.data.comment; // Adjusted for Axios response structure
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error(`An error happened: ${error}`);
  }
};
