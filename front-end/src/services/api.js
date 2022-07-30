import axios from 'axios';

const apiHost = 'localhost:3008'

const api = axios.create({
    baseURL: `//${apiHost}/api/`,
    json: true,
  });

export default api

