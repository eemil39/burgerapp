import axios from 'axios';

 const instance = axios.create({
    baseURL: 'https://burger-app-4df6b.firebaseio.com'
});

export default instance;