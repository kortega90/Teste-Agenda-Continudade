
import * as scheduleService from "../../services/schedule.service";
import ScheduleTableBody from "../ScheduleTableBody";
import "./styles.css";

import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";


export default function ScheduleCatalogCard() {
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

          {scheduleService.findAll().map((schedule) => (
            <ScheduleTableBody
              key={schedule.id}
              schedule={schedule}
            ></ScheduleTableBody>
          ))}

        </Table>
      </TableContainer>
    </>
  );
}
