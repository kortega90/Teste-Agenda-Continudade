import "./styles.css";
import { NavLink } from "react-router-dom";
import adm from '../../assets/adm-loged.svg'
import home from '../../assets/home.svg'
import LoggetUser from "../LoggedUser/intex";
import { useEffect, useState } from "react";
import * as userService from "../../services/user-Service"
import { UserDTO } from "../../models/user";

export default function HeaderAdmin() {
  
  const [user, setUser] = useState<UserDTO>();

  useEffect(() => {
    userService.findMe()
      .then(response => {
        setUser(response.data);
        console.log(response.data);
        console.log(user);
      })
      .catch( error => {
        console.log("Error", error);
      });
  }, [user]);


  return (
    <>
    <header className="dsc-header-admin">
      <nav className="dsc-container">
        <h1>DSC Admin</h1>
        <div className="dsc-navbar-right">
          <div className="dsc-menu-items-container">

            <div className="dsc-menu-item">

              <NavLink to={`/schedule/user/${user?.id}`}>
              <img src={home} alt="Início" />
              <p>Início</p>
              </NavLink>

            </div>

            <div className="dsc-menu-item">
              <img src={adm} alt="Cadastro de produtos" />
              <p className="dsc-menu-item-active"></p>
            </div>
          </div>
          <div style={{ cursor: "pointer" }}>
                <LoggetUser></LoggetUser>
              </div>

        </div>
      </nav>
    </header>
    </>
  );
}
