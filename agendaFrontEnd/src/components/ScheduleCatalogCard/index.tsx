
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
import { ScheduleDTO } from "../../models/Schedule"


type Props = {
  schedule: ScheduleDTO[];
  onClearSchedule:() => void;
};

export default function ScheduleCatalogCard({ schedule,onClearSchedule }: Props) {

 function handleDeleteSchedule(){
  onClearSchedule();
  }

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

          {schedule.map((schedule) => (
            <ScheduleTableBody
          
              key={schedule.id}
              schedule={schedule}
              onDeleteSchedule={handleDeleteSchedule}
            ></ScheduleTableBody>
          ))}

        </Table>
      </TableContainer>
    </>
  );
}
