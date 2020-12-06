import axios from 'axios';

const imageUploadApi = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

export default imageUploadApi;
