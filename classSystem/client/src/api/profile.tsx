import axios from './';
import {LoginPayload,RegisterPayload} from '@/typings/user';
export function validate(){
    return axios.get('/user/validate');
}

export function login<T>(values:LoginPayload){
    return axios.post<T,T>('/user/login',values);
}

export function register<T>(values:RegisterPayload){
    return axios.post<T,T>('/user/register',values);
}