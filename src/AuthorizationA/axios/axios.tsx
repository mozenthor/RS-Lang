import axios from 'axios';

const SERVER_URL ='https://final-rslang-backend.herokuapp.com';

export const api = axios.create({
  baseURL: SERVER_URL
})