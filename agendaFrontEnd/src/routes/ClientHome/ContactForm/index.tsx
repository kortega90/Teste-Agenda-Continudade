/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as userService from "../../../services/user-Service";
import * as contactService from "../../../services/contact-service";
import "./styles.css";
import { useEffect, useState } from "react";
import { UserDTO } from "../../../models/user";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import FormInput from "../../../components/FormInput";
import * as forms from "../../../utils/forms";


export default function ContactForm() {
  const params = useParams();

  const navigate = useNavigate();

  const isEditing = params.contactId != "create";
  // const scheduleID = params.scheduleId;

  const [user, setUser] = useState<UserDTO>();

  useEffect(() => {
    userService
      .findMe()
      .then((response) => {
        setUser(response.data);
      })
      // .catch((error) => {
      //   console.log("Error", error);
      // });
  }, []);

  const [formData, setFormData] = useState<any>({
    name: {
      value: "",
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Nome",
    },
    cep: {
      value: "",
      id: "cep",
      name: "cep",
      type: "cep",
      placeholder: "cep",
    },
    email: {
      value: "",
      id: "email",
      name: "email",
      type: "email",
      placeholder: "email",
    },
    phone: {
      value: "",
      id: "phone",
      name: "phone",
      type: "phone",
      placeholder: "phone",
    },
    cnpj: {
      value: "",
      id: "cnpj",
      name: "cnpj",
      type: "text",
      placeholder: "cnpj",
    },
    cpf: {
      value: "",
      id: "cpf",
      name: "cpf",
      type: "text",
      placeholder: "cpf",
    },
  });

  useEffect(() => {
    if (isEditing) {
      contactService
        .findContactById(Number(params.contactId))
        .then((response) => {
          const formattedData = {
            ...response.data,
          };
          setFormData(forms.updateAll(formData, formattedData));
        })
        .catch((error) => {
        console.log("Error fetching contact:", error);
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

  // function handleSumit(event: any) {
  //   event.preventDefault();

  //   const requestBody = forms.toValues(formData);

  //   if (isEditing){
  //     requestBody.id =params.scheduleId;
  //   }

  //   const request = isEditing
  //   ? scheduleService.updateSchedule(requestBody)
  //   : scheduleService.addSchedule(requestBody);

  //   request
  //     .then(() => {
  //       navigate(`/schedule/user/${user?.id}`)
  //     });
  // }

  return (
    <>
      <main>
        <section id="product-form-section" className="dsc-container">
          <div className="dsc-product-form-container">
            <form
              // onSubmit={handleSumit}
              className="dsc-card dsc-form"
            >
              <h2>Contact List</h2>

              <div className="dsc-form-controls-container">
              <div>
                {/* <div>
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
                    name={formData.cep.name}
                    type={formData.cep.type}
                    value={formData.cep.value}
                    placeholder={formData.cep.placeholder}
                    className="dsc-form-control"
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <FormInput
                    name={formData.email.name}
                    type={formData.email.type}
                    value={formData.email.value}
                    placeholder={formData.email.placeholder}
                    className="dsc-form-control"
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <FormInput
                    name={formData.phone.name}
                    type={formData.phone.type}
                    value={formData.phone.value}
                    placeholder={formData.phone.placeholder}
                    className="dsc-form-control"
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <FormInput
                    name={formData.cpf.name}
                    type={formData.cpf.type}
                    value={formData.cpf.value}
                    placeholder={formData.cpf.placeholder}
                    className="dsc-form-control"
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <FormInput
                    name={formData.cnpj.name}
                    type={formData.cnpj.type}
                    value={formData.cnpj.value}
                    placeholder={formData.cnpj.placeholder}
                    className="dsc-form-control"
                    onChange={handleInputChange}
                  />
                </div> */}
                </div>

                <div className="dsc-form-controls-container">
                  {Object.keys(formData).map((key) => (
                    <div key={key}>
                      <FormInput
                        name={formData[key].name}
                        type={formData[key].type}
                        value={formData[key].value}
                        placeholder={formData[key].placeholder}
                        className="dsc-form-control"
                        onChange={handleInputChange}
                      />
                    </div>
                  ))}
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
