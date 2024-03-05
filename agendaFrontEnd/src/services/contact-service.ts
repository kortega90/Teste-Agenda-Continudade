import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/request";
import { ContactDTO } from "../models/contact";


export function findContactById(idContact: number,) {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `/contact/${idContact}`,
  };
  return requestBackend(config);
}

export function deleteById(id: number) {
    const config: AxiosRequestConfig = {
      method: "DELETE",
      url: `/contact/delete/${id}`,
      withCredentials: true,
    };
    return requestBackend(config);
  }


  export function updateContact(obj: ContactDTO,idSchedule :number) {
    const config: AxiosRequestConfig = {
      method: "PUT",
      url: `/contact/update/${idSchedule}`,
      withCredentials: true,
      data: obj,
    };
    return requestBackend(config);
  }
  
  export function addContact(obj: ContactDTO,idSchedule :number) {
    const config: AxiosRequestConfig = {
      method: "POST",
      url: `/contact/add/${idSchedule}`,
      withCredentials: true,
      data: obj,
    };
    return requestBackend(config);
  }