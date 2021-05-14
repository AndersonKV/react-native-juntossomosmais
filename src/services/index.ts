import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.42.12:3333/',
});

export default api;
//json-server ./src/services/server.json --host 192.168.42.88 --port 3333 --delay 700
