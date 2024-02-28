import "./App.css";
import HeaderClient from "./components/HeaderClient";

function App() {
  return (
    <>
      <HeaderClient></HeaderClient>
      <main>
        <section id="" className="dsc-container">
        
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
    <tbody>


      <tr>
        <td className="name">Agenda 1</td>
        <td className="expiration-date">2024-02-28</td>
        <td className="created-at">2024-02-20</td>
        <td className="updated-at">2024-02-25</td>
        <td className="users">User 1, User 2, User 3</td>
        <td className="actions">
          <button className="edit-button">Edit</button>
          <button className="delete-button">Delete</button>
        </td>
      </tr>

      <tr>
        <td className="name">Agenda 2</td>
        <td className="expiration-date">2024-02-28</td>
        <td className="created-at">2024-02-20</td>
        <td className="updated-at">2024-02-25</td>
        <td className="users">User 1, User 2, User 3</td>
        <td className="actions">
          <button className="edit-button dsc-btn-contac">Edit</button>
          <button className="delete-button dsc-btn-contac">Delete</button>
        </td>

      </tr>
    </tbody>
  </table>
</div>


        </section>
      </main>
    </>
  );
}

export default App;
