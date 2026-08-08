import api from "../api/api";


export const RegisterUser = (userData) =>{
    return api.post(`/auth/register` , userData);
}

export const loginUser = (userData) =>{
    return api.post(`/auth/login` , userData);
}

export const logoutUser = ()=>{
    return api.post(`/auth/logout`);
}