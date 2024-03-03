/* eslint-disable @typescript-eslint/no-explicit-any */


import "./styles.css";
import * as authService from "../../../services/auth-service";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as userService from "../../../services/user-Service";
import { ContextToken } from "../../../utils/context-token";
import FormInput from "../../../components/FormInput";


export default function Login() {

  const {setContextTokenPayload}= useContext(ContextToken);


  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<any>({
    username: {
    value: "",
    id: "username",
    name: "username",
    type: "text",
    placeholder: "Email",
    validation: function (value: string) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value.toLowerCase());
    },
    message: "Favor informar um email válido",
    },
    password: {
    value: "",
    id: "password",
    name: "password",
    type: "password",
    placeholder: "Senha",
    }
    })

 
  function handleSubmit(event: any) {
    event.preventDefault();
    
    authService.loginRequest({username: formData.username.value, password: formData.password.value})
      .then(async (response) => {
        authService.saveAccessToken(response.data.access_token);
        setContextTokenPayload(authService.getAccessTokenPayload())
        try {
          const userResponse = await userService.findMe();
          const user = userResponse.data;
          
          if (user && user.id) {
            navigate(`/schedule/user/${user.id}`);
          } else {
            console.error("ID de usuário indefinido");
          }
        } catch (error) {
          console.log("Error ao buscar informações do usuário", error);
        }
      })
      .catch((error) => console.log("error no login", error));
  }

  // function handleInputChange(event: any) {
  //   const value = event.target.value;
  //   const name = event.target.name;
  //   setFormData({ ...formData[name], value:value });
  // }

  function handleInputChange(event: any) {
    const { value, name } = event.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        value: value
      }
    }));
  }
  
  return (
    <main>
      <section id="login-section" className="dsc-container">
        <div className="dsc-login-form-container">
          <form className="dsc-card dsc-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="dsc-form-controls-container">
              <div>
                <FormInput
                  name="username"
                  value={formData.username.value}
                  className="dsc-form-control "
                  type="text"
                  placeholder="Email"
                  onChange={handleInputChange}
                />

                <div className="dsc-form-error"></div>
              </div>
              <div>
                <FormInput
                  name="password"
                  value={formData.password.value}
                  className="dsc-form-control"
                  type="password"
                  placeholder="Senha"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="dsc-login-form-buttons dsc-mt20">
              <button type="submit" className="dsc-btn dsc-btn-blue">
                Entrar
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
