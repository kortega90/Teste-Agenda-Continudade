export type ContactDTO = {
    id: number;
    name: string;
    cep: string;
    email: string;
    phone: string;
    cnpj: string | null;
    cpf: string | null;
    scheduleId: number;
}