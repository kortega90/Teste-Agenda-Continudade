import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/request";


export function findMe() {
  const config: AxiosRequestConfig = {
    url: `/users/me`,
    withCredentials: true,
  };

  return requestBackend(config);
}


export function getAllUsers() {
    const config: AxiosRequestConfig = {
      method: "GET",
      url:`/users/all`,
  }
  return requestBackend(config);
}