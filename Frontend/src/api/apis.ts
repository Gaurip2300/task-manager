import axios from "axios";

const axiosInstance = axios.create({
    baseURL:'https://silver-zebra-v6r6r69r4wgq3wrw5-5173.app.github.dev/api',
    headers:{
        'Content-Type': 'application/json',
    }
})

export default axiosInstance