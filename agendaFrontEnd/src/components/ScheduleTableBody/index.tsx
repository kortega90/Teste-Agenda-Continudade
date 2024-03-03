import edit from "../../assets/edit-icon.svg";
import del from "../../assets/delete-button.svg";
import "./styles.css";
import * as scheduleService from "../../services/schedule.service"
import { TableBody, TableRow, TableCell, Button } from "@mui/material";

// import { Link } from "react-router-dom";

import { NavLink, useNavigate } from "react-router-dom";
import { ScheduleDTO } from "../../models/Schedule";
import { useState } from "react";
import DialogInfo from "../DialogInfo";
import DialogConfirmation from "../DialogConfirmation";

type Props = {
  schedule: ScheduleDTO;
  onDeleteSchedule: () => void;
};

export default function ScheduleTableBody({ schedule,onDeleteSchedule }: Props) {

 const navigate = useNavigate();
  
  const [dialogInfoData, setDialogInfoData] = useState({
    visible: false,
    menssage: "Operação com Sucesso",
  });

  const [dialogConfirmationData, setDialogConfirmationData] = useState({
    visible: false,
    id: 0,
    message: "Tem Certeza?",
  });

  function truncateName(name: string) {
    return name.length > 7 ? name.substring(0, 5) : name;
  }

  function handleDialogInfoClose() {
    setDialogInfoData({ ...dialogInfoData, visible: false });
  }

  function handleDialogDeleteClick(scheduleId:number) {
    setDialogConfirmationData ({ ...dialogConfirmationData, id:scheduleId , visible: true });
  }

  function handleDialogUpdateClick(scheduleId:number) {
    navigate(`/schedule/Form/${scheduleId}`)
  }


  function handleDialogConfirmationAnswer(answer: boolean, scheduleId:number){
    if (answer){
       scheduleService.deleteById(scheduleId)
       .then( () =>{
         onDeleteSchedule(); 
       })
       .catch(error => {
        setDialogInfoData({
          visible: true,
          menssage: error.response.data.error
        })
       })
    }
    setDialogConfirmationData({...dialogConfirmationData, visible: false});
  }

  return (
    <>
      <TableBody className="body-table-schedule">
        <TableRow>
          <TableCell className="name body-table-schedule">
            {schedule.name}
          </TableCell>
          <TableCell className="expiration-date body-table-schedule">
            {schedule.expirationDate.toLocaleString()}
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
                <img onClick = {() =>handleDialogUpdateClick(Number(schedule.id))} src={edit} alt="Editar" />
              </div>

              <div className="delete-button dsc-menu-items-container">
                <img
                  onClick={() =>handleDialogDeleteClick(Number(schedule.id))}
                  src={del}
                  alt="Excluir"
                />
              </div>

              {schedule.id && (
                <NavLink to={`/schedule/${schedule.id}`}>
                  <div className="access-button dsc-menu-items-container">
                    <Button>Acessar</Button>
                  </div>
                </NavLink>
              )}
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
      {dialogInfoData.visible && (
        <DialogInfo
          message={dialogInfoData.menssage}
          onDialogClose={handleDialogInfoClose}
        />
      )}
      {dialogConfirmationData.visible && (
        <DialogConfirmation
          id={dialogConfirmationData.id}
          message={dialogConfirmationData.message}
          onDialogAnswer={handleDialogConfirmationAnswer}
        />
      )}
    </>
  );
}
