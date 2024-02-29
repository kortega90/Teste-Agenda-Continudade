import { TableContainer, Paper, Table, TableHead, TableRow, TableCell } from "@mui/material";
import { ScheduleDTO } from "../../models/schedule";
import ContactTableBody from "../ContactTableBody";
import "./styles.css";

export default function ContactCatalogCard() {
  const schedule: ScheduleDTO = {
    id: 5,
    createdAt: "2024-02-29T09:59:32.932813",
    expirationDate: "2024-03-20T00:00:00",
    updatedAt: "2024-02-29T09:59:32.932813",
    users: [
      {
        id: 1,
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
    name: "",
  };

  return (
    <>
      <div className="table-container">
      <h2>Lista de Contactos</h2>
      <TableContainer component={Paper}>
        <Table className="agenda-table">
          <TableHead>
            <TableRow>
              <TableCell className="name">Name</TableCell>
              <TableCell className="cep">cep</TableCell>
              <TableCell className="email">email</TableCell>
              <TableCell className="phone">phone</TableCell>
              <TableCell className="cnpj">cnpj</TableCell>
              <TableCell className="cpf">cpf</TableCell>
              <TableCell className="actions">Actions</TableCell>
            </TableRow>
          </TableHead>
          {schedule.contacts.map((contact) => (
            <ContactTableBody key={contact.id} contact={contact} />
          ))}
        </Table>
      </TableContainer>
    </div>


    </>
  );
}
