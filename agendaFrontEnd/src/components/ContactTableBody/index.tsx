import { ContactDTO } from "../../models/contact";
import edit from "../../assets/edit-icon.svg";
import del from "../../assets/delete-button.svg";

import "./styles.css";


type Props = {
  contact: ContactDTO;
  };

export default function ContactCatalogCard({ contact }: Props) {
return(
    <>
    <tbody>
      <tr>
        <td>{contact.name}</td>
        <td>{contact.cep}</td>
        <td>{contact.email}</td>
        <td>{contact.phone}</td>
        <td>{contact.cnpj ? contact.cnpj : '-'}</td>
        <td>{contact.cpf ?contact.cpf:'_' }</td>
        <td className="actions">
          <div className="actions-icons">
            <div className="edit-button dsc-menu-items-container">
              <img src={edit} alt="Editar" />
            </div>
            <div className="delete-button dsc-menu-items-container">
              <img src={del} alt="Excluir" />
            </div>
          </div>
        </td>
      </tr>
    </tbody>
    </>
  );
}
