/* eslint-disable prefer-const */
import { ScheduleDTO } from "../models/Schedule";

export function findAll(): ScheduleDTO[]{
    return schedules;
}

export function findbyId(id:number): ScheduleDTO | undefined {
    schedules.sort((a, b) => a.id - b.id);
    return schedules.find(x => x.id === id);
}

let schedules : ScheduleDTO [] = [
        {
            "id": 3,
            "name": "Entrevista de Emprego",
            "createdAt": "2024-02-29T19:29:46.603144",
            "expirationDate": "2024-03-10T00:00:00",
            "updatedAt": "2024-02-29T19:29:46.603144",
            "users": [
                {
                    "id": 1,
                    "name": "Kengi Ortega",
                    "email": "kortega90@hotmail.com"
                },
                {
                    "id": 2,
                    "name": "Maria Silva",
                    "email": "maria.silva@example.com"
                },
                {
                    "id": 3,
                    "name": "John Doe",
                    "email": "john.doe@example.com"
                }
            ],
            "contacts": [
                {
                    "id": 4,
                    "name": "Empresa A",
                    "cep": "12345458",
                    "email": "contato4@example.com",
                    "phone": "123476789",
                    "cnpj": "12345678901234",
                    "cpf": null,
                    "scheduleId": 3
                },
                {
                    "id": 5,
                    "name": "Empresa B",
                    "cep": "23456789",
                    "email": "contato5@example.com",
                    "phone": "234567890",
                    "cnpj": "56789012345678",
                    "cpf": null,
                    "scheduleId": 3
                }
            ]
        },
        {
            "id": 2,
            "name": "Apresentação do Projeto",
            "createdAt": "2024-02-29T19:29:46.603144",
            "expirationDate": "2024-03-05T00:00:00",
            "updatedAt": "2024-02-29T19:29:46.603144",
            "users": [
                {
                    "id": 1,
                    "name": "Kengi Ortega",
                    "email": "kortega90@hotmail.com"
                }
            ],
            "contacts": [
                {
                    "id": 3,
                    "name": "Pedro Oliveira",
                    "cep": "34567890",
                    "email": "contato3@example.com",
                    "phone": "345678901",
                    "cnpj": null,
                    "cpf": "111.222.333-44",
                    "scheduleId": 2
                }
            ]
        },
        {
            "id": 1,
            "name": "Reunião de Equipe",
            "createdAt": "2024-02-29T19:29:46.603144",
            "expirationDate": "2024-03-01T00:00:00",
            "updatedAt": "2024-02-29T19:29:46.603144",
            "users": [
                {
                    "id": 1,
                    "name": "Kengi Ortega",
                    "email": "kortega90@hotmail.com"
                }
            ],
            "contacts": [
                {
                    "id": 1,
                    "name": "João Silva",
                    "cep": "12345678",
                    "email": "contato1@example.com",
                    "phone": "123456789",
                    "cnpj": null,
                    "cpf": "123.456.789-10",
                    "scheduleId": 1
                },
                {
                    "id": 2,
                    "name": "Maria Souza",
                    "cep": "23456789",
                    "email": "contato2@example.com",
                    "phone": "234567890",
                    "cnpj": null,
                    "cpf": "987.654.321-00",
                    "scheduleId": 1
                }
            ]
        },
        {
            "id": 5,
            "name": "Conferência Anual",
            "createdAt": "2024-02-29T19:29:46.603144",
            "expirationDate": "2024-03-20T00:00:00",
            "updatedAt": "2024-02-29T19:29:46.603144",
            "users": [
                {
                    "id": 1,
                    "name": "Kengi Ortega",
                    "email": "kortega90@hotmail.com"
                }
            ],
            "contacts": []
        }
    ]

