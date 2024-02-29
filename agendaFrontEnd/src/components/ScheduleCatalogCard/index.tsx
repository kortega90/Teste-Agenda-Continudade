import ScheduleTableBody from "../ScheduleTableBody";
import "./styles.css";

export default function ScheduleCatalogCard() {
  return (
    <>
      <div className="table-container">
        <h2>Lista de Agendas</h2>
        <table className="agenda-table">
          <thead>
            <tr>
              <th className="name">Name</th>
              <th className="expiration-date">Expiration Date</th>
              <th className="created-at">Created At</th>
              <th className="updated-at">Updated At</th>
              <th className="users">Users</th>
              <th className="actions">Actions</th>
            </tr>
          </thead>
          <ScheduleTableBody></ScheduleTableBody>
          <ScheduleTableBody></ScheduleTableBody>
          <ScheduleTableBody></ScheduleTableBody>
        </table>
      </div>
    </>
  );
}
