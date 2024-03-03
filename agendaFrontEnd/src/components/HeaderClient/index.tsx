import "./styles.css";
import iconAdmin from "../../assets/user-admin.svg";
import { Link } from "react-router-dom";
import * as authService from "../../services/auth-service";
import { useContext, useEffect, useState } from "react";
import { ContextToken } from "../../utils/context-token";
import { NavLink } from "react-router-dom";
import LoggetUser from "../LoggedUser/intex";
import * as userService from "../../services/user-Service";
import { UserDTO } from "../../models/user";

export default function HeaderClient() {
  const { contextTokenPayload } = useContext(ContextToken);
  const [user, setUser] = useState<UserDTO>();

  useEffect(() => {
    userService.findMe()
      .then(response => {
        setUser(response.data);
      })
      .catch( error => {
        console.log("Error", error);
      });
  }, []);
  
  return (
    <>
      <header className="dsc-header-client dsc-mb20 ">
        <nav className="dsc-container">
          <Link to={`/schedule/user/${user?.id}`}>
            <h1>DSAgenda</h1>
          </Link>
          <div className="dsc-navbar-right">
            <div className="dsc-menu-items-container">
              {contextTokenPayload &&
                authService.hasAnyRoles(["ROLE_ADMIN"]) && (
                  <NavLink to={"/admin/home"}>
                    <div className="dsc-menu-item">
                      <img src={iconAdmin} alt="Admin" />
                    </div>
                  </NavLink>
                )}

              <div style={{ cursor: "pointer" }}>
                <LoggetUser></LoggetUser>
              </div>

            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
