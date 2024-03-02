import "./styles.css";
// import iconAdmin from "../../assets/user-admin.svg";
// import user from "../../assets//adm-loged.png";
// import { NavLink } from "react-router-dom";
import adm from '../../assets/adm-loged.svg'
import home from '../../assets/home.svg'
export default function HeaderAdmin() {
  return (
    <>
    <header className="dsc-header-admin">
      <nav className="dsc-container">
        <h1>DSC Admin</h1>
        <div className="dsc-navbar-right">
          <div className="dsc-menu-items-container">
            <div className="dsc-menu-item">
              <img src={home} alt="Início" />
              <p>Início</p>
            </div>
            <div className="dsc-menu-item">
              <img src={adm} alt="Cadastro de produtos" />
              <p className="dsc-menu-item-active"></p>
            </div>
          </div>
          <div className="dsc-logged-user">
            <p>Maria Silva</p>
            <a href="#">Sair</a>
          </div>
        </div>
      </nav>
    </header>
    </>
  );
}
