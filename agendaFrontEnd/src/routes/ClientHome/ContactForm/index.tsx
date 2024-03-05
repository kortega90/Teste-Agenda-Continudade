/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as contactService from "../../../services/contact-service";
import "./styles.css";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import FormInput from "../../../components/FormInput";
import * as forms from "../../../utils/forms";

function validateCpf(cpf: string): boolean {
   // Remove caracteres não numéricos
   cpf = cpf.replace(/\D/g, '');
   // Verifica se o CPF tem 11 dígitos
   if (cpf.length !== 11) return false;
   // Verifica se todos os dígitos são iguais
   if (/^(\d)\1+$/.test(cpf)) return false;
   // Calcula o primeiro dígito verificador
   let sum = 0;
   for (let i = 0; i < 9; i++) {
       sum += parseInt(cpf.charAt(i)) * (10 - i);
   }
   let digit = 11 - (sum % 11);
   if (digit >= 10) digit = 0;
   // Verifica se o primeiro dígito verificador está correto
   if (parseInt(cpf.charAt(9)) !== digit) return false;
   // Calcula o segundo dígito verificador
   sum = 0;
   for (let i = 0; i < 10; i++) {
       sum += parseInt(cpf.charAt(i)) * (11 - i);
   }
   digit = 11 - (sum % 11);
   if (digit >= 10) digit = 0;
   // Verifica se o segundo dígito verificador está correto
   if (parseInt(cpf.charAt(10)) !== digit) return false;
   return true;
}

// Função para validar CEP
function validateCep(cep: string): boolean {
    cep = cep.replace(/\D/g, '');

    if (cep.length !== 8) return false;
    return true;
}

// Função para validar email
function validateEmail(email: string): boolean {
    const emailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    console.log("🚀 ~ validateEmail ~ emailRegex:", emailRegex.test(email))
    return emailRegex.test(email);
}

function validateTelefone(telefone: string): boolean {
  const telefoneRegex = /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[0-9])[0-9]{3}-?[0-9]{4}$/;
  console.log("🚀 ~ validateTelefone ~ telefoneRegex :", telefoneRegex.test(telefone))
  
  return telefoneRegex.test(telefone);
}

export default function ContactForm() {
  const params = useParams();

  const navigate = useNavigate();

  const isEditing = params.contactId != "create";

  const scheduleId = Number(params.scheduleId);


  const [formData, setFormData] = useState<any>({
    name: {
      value: "",
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Nome",
      valid: true, 
    },
    cep: {
      value: "",
      id: "cep",
      name: "cep",
      type: "cep",
      placeholder: "cep",
      valid: true,
    },
    email: {
      value: "",
      id: "email",
      name: "email",
      type: "email",
      placeholder: "email",
      valid: true,
    },
    phone: {
      value: "",
      id: "phone",
      name: "phone",
      type: "phone",
      placeholder: "phone",
      valid: true
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
      valid: true
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

  function handleSumitContact(event: any) {
    event.preventDefault();

    const requestBody = forms.toValues(formData);

    if (isEditing){
      requestBody.id = params.contactId;
    }

    const request = isEditing
    ? contactService.updateContact(requestBody, scheduleId)
    : contactService.addContact(requestBody, scheduleId);

    request
      .then(() => {
        navigate(`/schedule/${scheduleId}`)
      });
  }

  const handleBlur = (name: string) => {
    let isValid = true;

    switch (name) {
      case "cpf":
        isValid = validateCpf(formData[name].value);
        break;
      case "cep":
        isValid = validateCep(formData[name].value);
        break;
      case "email":
        isValid = validateEmail(formData[name].value);
        break;
      case "phone":
        isValid = validateTelefone(formData[name].value);
        break;
      default:
        break;
    }

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: {
        ...prevFormData[name],
        valid: isValid,
      },
    }));
  };

  return (
    <>
      <main>
        <section id="product-form-section" className="dsc-container">
          <div className="dsc-product-form-container">
            <form
              onSubmit={handleSumitContact}
              className="dsc-card dsc-form"
            >
              <h2>Contact List</h2>

              <div className="dsc-form-controls-container">
              <div>
                <div>
                  <FormInput
                    name={formData.name.name}
                    type={formData.name.type}
                    value={formData.name.value}
                    placeholder={formData.name.placeholder}
                    className="dsc-form-control dsc-form-control-contact"
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <FormInput
                    name={formData.cep.name}
                    type={formData.cep.type}
                    value={formData.cep.value}
                    placeholder={formData.cep.placeholder}
                    className={`dsc-form-control dsc-form-control-contact ${!formData.cep.valid ? "invalid" : ""}`}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("cep")}
                  />
                  {!formData.cep.valid && <span className="error-message">CEP inválido</span>}
                </div>

                <div>
                  <FormInput
                    name={formData.email.name}
                    type={formData.email.type}
                    value={formData.email.value}
                    placeholder={formData.email.placeholder}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("email")}
                    className={`dsc-form-control dsc-form-control-contact ${!formData.email.valid ? "invalid" : ""}`}
                  />
                  {!formData.email.valid && <span className="error-message">Email inválido</span>}
                </div>

                <div>
                  <FormInput
                    name={formData.phone.name}
                    type={formData.phone.type}
                    value={formData.phone.value}
                    placeholder={formData.phone.placeholder}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("phone")}
                    className={`dsc-form-control dsc-form-control-contact ${!formData.phone.valid ? "invalid" : ""}`}   
                  />
                  {!formData.phone.valid && <span className="error-message">Telefone inválido</span>}
                </div>

                <div>
                  <FormInput
                    name={formData.cpf.name}
                    type={formData.cpf.type}
                    value={formData.cpf.value}
                    placeholder={formData.cpf.placeholder}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("cpf")}
                    className={`dsc-form-control dsc-form-control-contact ${!formData.cpf.valid ? "invalid" : ""}`}
                  />
                   {!formData.cpf.valid && <span className="error-message">CPF inválido</span>}
                </div>

                <div>
                  <FormInput
                    name={formData.cnpj.name}
                    type={formData.cnpj.type}
                    value={formData.cnpj.value}
                    placeholder={formData.cnpj.placeholder}
                    className="dsc-form-control dsc-form-control-contact"
                    onChange={handleInputChange}
                  />
                </div>
                </div>

                {/* <div className="dsc-form-controls-container">
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
                </div> */}

              </div>

              <div className="dsc-product-form-buttons">
                <NavLink to={`/schedule/${scheduleId}`}>
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
