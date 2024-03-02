
import "./styles.css";
import * as authService from "../../../services/auth-service";
import { ChangeEvent, FormEvent, useState } from "react";
import { CredentialsDTO } from "../../../models/auth";
import { useNavigate } from "react-router-dom";
import * as userService from "../../../services/user-Service";
// import { UserDTO } from "../../../models/user";
// import { UserDTO } from "../../../models/user";

export default function Login() {
  
  // const [user, setUser] = useState<UserDTO>();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<CredentialsDTO>({
    username: "",
    password: "",
  });


  // function handleSubmit(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   authService
  //     .loginRequest(formData)
  //     .then((response) => {
  //       authService.saveAccessToken(response.data.access_token);
  //       navigate(`/schedule/user/1`)
  //     })
  //     .catch((error) => console.log("error no login", error));
  // }
 

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    authService.loginRequest(formData)
      .then(async (response) => {
        authService.saveAccessToken(response.data.access_token);
        
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

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const name = event.target.name;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <main>
      <section id="login-section" className="dsc-container">
        <div className="dsc-login-form-container">
          <form className="dsc-card dsc-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="dsc-form-controls-container">
              <div>
                <input
                  name="username"
                  value={formData.username}
                  className="dsc-form-control "
                  type="text"
                  placeholder="Email"
                  onChange={handleInputChange}
                />

                <div className="dsc-form-error"></div>
              </div>
              <div>
                <input
                  name="password"
                  value={formData.password}
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
