import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API base URL

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchTweets = async () => {
  const response = await api.get('/tweets');
  return response.data;
};

export const postTweet = async (content) => {
  const response = await api.post('/tweets', { content });
  return response.data;
};

export default api;
