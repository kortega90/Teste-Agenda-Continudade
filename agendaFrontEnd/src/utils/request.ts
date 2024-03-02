import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "./system";

export function requestBackend(confing: AxiosRequestConfig){
 return axios({...confing, baseURL:BASE_URL})
}