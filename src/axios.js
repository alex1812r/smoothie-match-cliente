import axios from 'axios';

const Axios = axios.create({ baseURL: process.env.VUE_APP_ROOT_API });

export default Axios;