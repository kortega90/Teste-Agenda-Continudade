import edit from "../../assets/edit-icon.svg";
import del from "../../assets/delete-button.svg";
import "./styles.css";

export default function ScheduleTableBody() {
  return (
    <>
      <tbody className="body-table-schedule">
        <tr >
          <td className="name body-table-schedule">Agenda 1</td>
          <td className="expiration-date body-table-schedule">2024-02-28</td>
          <td className="created-at">2024-02-20</td>
          <td className="updated-at">2024-02-25</td>
          <td className="users">User 1, User 2, User 3</td>
          <td className="actions">
            <div className="actions-icons">
              <div className="edit-button dsc-menu-items-container">
                <img src={edit} alt="Editar" />
              </div>
              <div className="delete-button dsc-menu-items-container">
                <img src={del} alt="Excluir" />
              </div>
              <div className="access-button dsc-menu-items-container access-button">
                <button>Acessar</button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </>
  );
}
