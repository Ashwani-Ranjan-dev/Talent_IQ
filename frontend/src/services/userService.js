import axios from "axios";

const API = "http://localhost:8000/api/user";

export const RegisterUser = (userData) =>{
    return axios.post(API , userData);
}