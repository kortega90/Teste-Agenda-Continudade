import edit from "../../assets/edit-icon.svg";
import del from "../../assets/delete-button.svg";
import "./styles.css";

export default function ScheduleTableBody() {
  return (
    <>
      <tbody>
        <tr>
          <td className="name">Agenda 1</td>
          <td className="expiration-date">2024-02-28</td>
          <td className="created-at">2024-02-20</td>
          <td className="updated-at">2024-02-25</td>
          <td className="users">User 1, User 2, User 3</td>
          <td className="actions">
            <div className="actions-icons">
              <div className="edit-button dsc-menu-items-container">
                <img src={edit} alt="Carrinho de compras" />
              </div>
              <div className="delete-button dsc-menu-items-container">
                <img src={del} alt="Carrinho de compras" />
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </>
  );
}
