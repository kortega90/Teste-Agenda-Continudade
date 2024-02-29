import { ContactDTO } from "../../models/contact";
import ContactTableBody from "../ContactTableBody";
import "./styles.css";

export default function ContactCatalogCard() {

  const contact: ContactDTO = {
    name: "João Silva Lz",
    cep: "12345678",
    email: "contato@example.com",
    phone: "43988424366",
    cnpj: null,
    cpf: "123.456.789-10",
    id: 0,
    scheduleId: 0
  };

  return (
    <>
      <div className="table-container">
        <h2>Lista de Contactos</h2>
        <table className="agenda-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>cep</th>
              <th>email</th>
              <th>phone</th>
              <th>cnpj</th>
              <th>cpf</th>
              <th>Actions</th>
            </tr>
          </thead>
          
            <ContactTableBody contact={contact}/>
          
        </table>
      </div>
    </>
  );
}
