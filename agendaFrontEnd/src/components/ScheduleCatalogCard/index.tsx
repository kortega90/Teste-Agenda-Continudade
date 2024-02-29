import { TableContainer, Paper, Table, TableHead, TableRow, TableCell} from "@mui/material";
import { ScheduleDTO } from "../../models/schedule";
import ScheduleTableBody from "../ScheduleTableBody";
import "./styles.css";

export default function ScheduleCatalogCard() {

  const schedule: ScheduleDTO = {
    
    id: 5,
    name: "Conferência Anual",
    createdAt: "2024-02-29T09:59:32.932813",
    expirationDate: "2024-03-20T00:00:00",
    updatedAt: "2024-02-29T09:59:32.932813",
    users: [
      {
        id: 1,
        name: "Kengi Ortega",
        email: "kortega90@hotmail.com",
      },
      {
        id: 2,
        name: "Kengi Ortega",
        email: "kortega90@hotmail.com",
      },
      {
        id: 3,
        name: "Kengi Ortega",
        email: "kortega90@hotmail.com",
      },
      {
        id: 3,
        name: "Kengi Ortega",
        email: "kortega90@hotmail.com",
      },
      {
        id: 3,
        name: "Kengi Ortega",
        email: "kortega90@hotmail.com",
      },

      {
        id: 3,
        name: "Kengi Ortega",
        email: "kortega90@hotmail.com",
      },
      {
        id: 3,
        name: "Kengi Ortega",
        email: "kortega90@hotmail.com",
      },
    ],
    contacts: [
      {
        id: 7,
        name: "Gerente Empresa A",
        cep: "86062490",
        email: "contato4@example.com",
        phone: "123476789",
        cnpj: null,
        cpf: "33918702812",
        scheduleId: 5,
      },
      {
        id: 8,
        name: "Carlos Perez",
        cep: "86062490",
        email: "contato7@example.com",
        phone: "127476789",
        cnpj: null,
        cpf: "78171600824",
        scheduleId: 5,
      },
      {
        id: 9,
        name: "Empresa B",
        cep: "86062490",
        email: "contato4@example.com",
        phone: "123476789",
        cnpj: "15878446085",
        cpf: null,
        scheduleId: 5,
      },
      {
        id: 10,
        name: "Empresa C",
        cep: "86062490",
        email: "contato5@example.com",
        phone: "234567890",
        cnpj: "56789012345678",
        cpf: null,
        scheduleId: 5,
      },
    ],
  };
  return (
    <>
      <TableContainer component={Paper} className="table-container">
      <h2>Lista de Agendas</h2>
      <Table className="agenda-table">
        <TableHead>
          <TableRow>
            <TableCell className="name">Name</TableCell>
            <TableCell className="expiration-date">Expiration Date</TableCell>
            <TableCell className="created-at">Created At</TableCell>
            <TableCell className="updated-at">Updated At</TableCell>
            <TableCell className="users">Users Admin</TableCell>
            <TableCell className="actions">Actions</TableCell>
          </TableRow>
        </TableHead>

          <ScheduleTableBody key={schedule.id} schedule={schedule}></ScheduleTableBody>
          <ScheduleTableBody key={schedule.id} schedule={schedule}></ScheduleTableBody>
          <ScheduleTableBody key={schedule.id} schedule={schedule}></ScheduleTableBody>

      </Table>
    </TableContainer>
    </>
  );
}
