
import axios from "axios";
const BASE_URL = 'http://makeit.dev'; 

export default ()=>{
    return axios.create({
        baseURL:BASE_URL,
        withCredentials:true
    })
};

export const axiosPrivet = axios.create({
        baseURL:BASE_URL,
        headers: {'Content-Type' : 'application/json'},
        withCredentials : true,
    })

