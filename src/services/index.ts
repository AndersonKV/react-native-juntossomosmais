import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.42.39:3333/',
});

export default api;
//json-server ./server.json --192.168.42.39 --port 3333 --delay 700
//json-server ./server.json --host 192.168.42.3 --port 3333 --delay 700
