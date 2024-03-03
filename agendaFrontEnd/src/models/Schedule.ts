import { ContactDTO } from "./contact";
import { UserDTO } from "./user";

export type ScheduleDTO = {
    id: number;
    name:string;
    createdAt: string;
    expirationDate: Date;
    updatedAt: string;
    users: UserDTO[];
    contacts: ContactDTO[];
}