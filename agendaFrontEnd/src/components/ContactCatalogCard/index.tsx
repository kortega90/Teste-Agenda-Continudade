import "./styles.css";
import ContactTableBody from "../ContactTableBody";
import "./styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ScheduleDTO } from "../../models/schedule";
import * as scheduleService from "../../services/schedule.service";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";


export default function ContactCatalogCard() {
  const params = useParams();
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState<ScheduleDTO | undefined>();

  useEffect(() => {
    scheduleService
      .findScheduleById(Number(params.scheduleId))
      .then((response) => {
        setSchedule(response.data);
      })
      .catch(() => {
        navigate("/");
      });
  }, [params.scheduleId, navigate]);


  return (
    <>
      <TableContainer component={Paper} className="table-container">
        <div style={{ padding: "10px 0" }}>
          <h2>
            {" "}
            Contactos da Agenda :<span /> {schedule?.name}
          </h2>
        </div>

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
          {schedule &&
            schedule.contacts.map((contact) => (
              <ContactTableBody key={contact.id} contact={contact} />
            ))}
        </Table>
      </TableContainer>
    </>
  );
}
