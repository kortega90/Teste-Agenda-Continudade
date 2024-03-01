import edit from "../../assets/edit-icon.svg";
import del from "../../assets/delete-button.svg";
import "./styles.css";

import { TableBody, TableRow, TableCell, Button } from "@mui/material";
import { ScheduleDTO } from "../../models/Schedule";
import { Link } from "react-router-dom";

type Props = {
  schedule: ScheduleDTO;
};

export default function ScheduleTableBody({ schedule }: Props) {
  function truncateName(name: string) {
    return name.length > 7 ? name.substring(0, 5) : name;
  }

  return (
    <>
      <TableBody className="body-table-schedule">
        <TableRow>
          <TableCell className="name body-table-schedule">
            {schedule.name}
          </TableCell>
          <TableCell className="expiration-date body-table-schedule">
            {schedule.expirationDate}
          </TableCell>
          <TableCell className="created-at">{schedule.createdAt}</TableCell>
          <TableCell className="updated-at">{schedule.updatedAt}</TableCell>
          <TableCell className="users">
            {schedule.users.map((user) => (
              <Button
                key={user.id}
                className="user-button"
                title={user.name}
                style={{ border: "1px solid #45a049", marginLeft: "4px" }}
              >
                {truncateName(user.name)}
              </Button>
            ))}
          </TableCell>

          <TableCell className="actions">
            <div className="actions-icons">
              <div className="edit-button dsc-menu-items-container">
                <img src={edit} alt="Editar" />
              </div>

              <div className="delete-button dsc-menu-items-container">
                <img src={del} alt="Excluir" />
              </div>
              {schedule.id && (
                <Link to={`/schedule/contacts/${schedule.id}`}>
                  <div className="access-button dsc-menu-items-container">
                    <Button>Acessar</Button>
                  </div>
                </Link>
              )}
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
}
