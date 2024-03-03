
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/request";

export function findAllSchedulesByUserId(
  idUser: number,
  page: number,
  name: string,
  size = 5,
  sort = "name") {
  const config: AxiosRequestConfig = {
    method: "GET",
    url:`/schedule/user/${idUser}`,
    params:{
    page,
    name,
    size,
    sort,
  }
}
  return requestBackend(config);
}

export function findScheduleById(
  idSchedule: number,
  name: string,
  sort = "name") {
    const config: AxiosRequestConfig = {
      method: "GET",
      url:`/schedule/${idSchedule}`,
      params:{
      name,
      sort,
    }
  }
  return requestBackend(config);
}

export function deleteById(id:number){

  const config: AxiosRequestConfig = {
    method: "DELETE",
    url:`/schedule/delete/${id}`,
    withCredentials:true
  }
  return requestBackend(config);
}
