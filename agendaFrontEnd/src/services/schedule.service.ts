
import axios from "axios";
import { BASE_URL } from "../utils/system";


export function findAllSchedulesByUserId(idUser:number){
    return axios.get(`${BASE_URL}/schedule/user/${idUser}?size=5&page=0&sort`);
}

export function findScheduleById(idSchedule:number) {
    return axios.get(`${BASE_URL}/schedule/${idSchedule}`);
}

