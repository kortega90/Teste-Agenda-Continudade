/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as userService from "../../../services/user-Service";
import * as scheduleService from "../../../services/schedule.service";
import "./styles.css";
import { useEffect, useState } from "react";
import { UserDTO } from "../../../models/user";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import FormInput from "../../../components/FormInput";
import * as forms from "../../../utils/forms";
import FormSelect from "../../../components/FormSelect";

export default function ScheduleForm() {
  const params = useParams();

  const navigate =useNavigate();

  const isEditing = params.scheduleId != "create";

  const [users, setUsers] = useState<UserDTO[]>([]);

  const [user, setUser] = useState<UserDTO>();

  function formatToDateString(dateTimeString: string | number | Date) {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}T00:00:00`;
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
      type: "datetime-local",
      placeholder: "Data de Validade (dd/mm/aaaa)",
    },
    users: {
      value: "",
      id: "users",
      name: "users",
      placeholder: "Usuarios Admin",
    },
  });

  useEffect(() => {
    userService.getAllUsers().then((response) => {
      setUsers(response.data.content);
    });
  }, []);

  useEffect(() => {
    if (isEditing) {
      scheduleService
        .findScheduleById(Number(params.scheduleId), "")
        .then((response) => {
          const formattedData = {
            ...response.data,
            expirationDate: formatToDateString(response.data.expirationDate),
          };
          setFormData(forms.updateAll(formData, formattedData));
        });
    }
  }, []);

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

  function handleSumit(event: any) {
    event.preventDefault();

    const requestBody = forms.toValues(formData);

    if (isEditing){
      requestBody.id =params.scheduleId;
    }

    const request = isEditing
    ? scheduleService.updateSchedule(requestBody)
    : scheduleService.addSchedule(requestBody);

    request
      .then(() => {
        navigate(`/schedule/user/${user?.id}`)
      });
  }

  return (
    <>
      <main>
        <section id="product-form-section" className="dsc-container">
          <div className="dsc-product-form-container">
            <form onSubmit={handleSumit} className="dsc-card dsc-form">
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
                  <p style={{ color: "#636363" }}>
                    Data de Validade (dd/mm/aaaa)
                  </p>
                </div>

                <div>
                  <FormSelect
                    isMulti
                    name={formData.users.name}
                    type={formData.users.type}
                    value={formData.users.value}
                    placeholder={formData.users.placeholder}
                    onChange={(obj: any) => {
                      const newFormData = forms.update(formData, "users", obj);
                      setFormData(newFormData);
                    }}
                    options={users}
                    getOptionLabel={(obj: any) => obj.name}
                    getOptionValue={(obj: any) => String(obj.id)}
                  />
                </div>
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
