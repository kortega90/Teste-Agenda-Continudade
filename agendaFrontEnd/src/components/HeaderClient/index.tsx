import "./styles.css";
import iconAdmin from "../../assets/user-admin.svg";
import { Link } from "react-router-dom";
import * as authService from "../../services/auth-service";

export default function HeaderClient() {
  return (
    <>
      <header className="dsc-header-client dsc-mb20 ">
        <nav className="dsc-container">
          <Link to="/">
            <h1>DSAgenda</h1>
          </Link>
          <div className="dsc-navbar-right">
            <div className="dsc-menu-items-container">

              {authService.hasAnyRoles(["ROLE_ADMIN"]) && (
                <div className="dsc-menu-item">
                  <img src={iconAdmin} alt="Admin" />
                </div>
              )}

            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
