import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/request";


export function deleteById(id: number) {
    const config: AxiosRequestConfig = {
      method: "DELETE",
      url: `/contact/delete/${id}`,
      withCredentials: true,
    };
    return requestBackend(config);
  }