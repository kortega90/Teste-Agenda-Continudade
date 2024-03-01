import edit from "../../assets/edit-icon.svg";
import del from "../../assets/delete-button.svg";

import "./styles.css";
import { ContactDTO } from "../../models/contact";
import { TableBody, TableRow, TableCell } from "@mui/material";

type Props = {
  contact: ContactDTO;
};

export default function ContactCatalogCard({ contact }: Props) {
  return (
    <>
      <TableBody>
        <TableRow>
          <TableCell>{contact.name}</TableCell>
          <TableCell>{contact.cep}</TableCell>
          <TableCell>{contact.email}</TableCell>
          <TableCell>{contact.phone}</TableCell>
          <TableCell>{contact.cnpj ? contact.cnpj : "-"}</TableCell>
          <TableCell>{contact.cpf ? contact.cpf : "_"}</TableCell>
          <TableCell className="actions">
            <div className="actions-icons">
              <div className="edit-button dsc-menu-items-container">
                <img src={edit} alt="Editar" />
              </div>
              <div className="delete-button dsc-menu-items-container">
                <img src={del} alt="Excluir" />
              </div>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
}
