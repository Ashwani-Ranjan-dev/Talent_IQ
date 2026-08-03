import api from "../api/api";


export const RegisterUser = (userData) =>{
    return api.post(`/auth/register` , userData);
}