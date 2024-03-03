/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as userService from "../../../services/user-Service";
import * as scheduleService from "../../../services/schedule.service";
import "./styles.css";
import { useEffect, useState } from "react";
import { UserDTO } from "../../../models/user";
import { NavLink, useParams } from "react-router-dom";
import FormInput from "../../../components/FormInput";
import * as forms from "../../../utils/forms";

export default function ScheduleForm() {
  const params = useParams();

  const isEditing = params.scheduleId != "create";

  const [user, setUser] = useState<UserDTO>();

  function convertToDateString(dateTimeString: string | number | Date) {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0'); 
    return `${year}-${month}-${day}`;
  }
  
  useEffect(() => {
    userService
      .findMe()
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

  const [formData, setFormData] = useState<any>({
    name: {
      value: "",
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Nome",
    },
    expirationDate: {
      value: "",
      id: "expirationDate",
      name: "expirationDate",
      type: "date",
      placeholder: "Data de Validade (dd/mm/aaaa)",
    },
  });

  useEffect(() => {
    if (isEditing) {
      scheduleService
        .findScheduleById(Number(params.scheduleId), "")
        .then((response) => {

          // console.log(forms.updateAll(formData, response.data));
          // setFormData(forms.updateAll(formData, response.data));
          // console.log("Name:", formData.name);
          // console.log("Expiration Date:", formData.expirationDate);
          
          const formattedData = {
            ...response.data,
            expirationDate: convertToDateString(response.data.expirationDate)
          };
          // Atualiza o estado com os novos dados formatados
          setFormData(forms.updateAll(formData, formattedData));

        });
    }
  }, []);

  // function handleInputChange(event: any) {
  //   const value = event.target.value;
  //   const name = event.target.name;
  //   setFormData(forms.update(formData, name, value));
  // }

  function handleInputChange(event: any) {
    const { value, name } = event.target;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: {
        ...prevFormData[name],
        value: value,
      },
    }));
  }
  return (
    <>
      <main>
        <section id="product-form-section" className="dsc-container">
          <div className="dsc-product-form-container">
            <form className="dsc-card dsc-form">
              <h2>Schedule Data</h2>
              <div className="dsc-form-controls-container">
                <div>
                  <FormInput
                    name={formData.name.name}
                    type={formData.name.type}
                    value={formData.name.value}
                    placeholder={formData.name.placeholder}
                    className="dsc-form-control"
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <FormInput
                    name={formData.expirationDate.name}
                    type={formData.expirationDate.type}
                    value={formData.expirationDate.value}
                    placeholder={formData.expirationDate.placeholder}
                    className="dsc-form-control"
                    onChange={handleInputChange}
                  />
                  <p style={{color:"#636363"}}>Data de Validade (dd/mm/aaaa)</p>
                </div>

                {/* <div>
                  <select className="dsc-form-control dsc-select" required>
                    <option value="" disabled selected>
                      Users Admin
                    </option>
                    <option value="1">Users Admin 1</option>
                    <option value="2">Users Admin 2</option>
                  </select>
                </div> */}
              </div>

              <div className="dsc-product-form-buttons">
                <NavLink to={`/schedule/user/${user?.id}`}>
                  <button type="reset" className="dsc-btn dsc-btn-white">
                    Cancelar
                  </button>
                </NavLink>

                <button type="submit" className="dsc-btn dsc-btn-blue">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
