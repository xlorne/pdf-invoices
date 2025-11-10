import axios from "axios";

const api = axios.create({
    timeout: 100000,
    baseURL: '/',
    headers: {
        "Content-Type": "application/json",
    },
});

export const info = async () =>{
    return await api.get('/api/info');
}


export const summer =async ()=>{
    return await api.get('/api/summer');
}


export const check =async ()=>{
    return await api.get('/api/check');
}


export const margin =async ()=>{
    return await api.get('/api/margin');
}


export const print =async ()=>{
    return await api.get('/api/print');
}